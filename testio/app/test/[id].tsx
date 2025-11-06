import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { api, Test } from '@/services/api';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function TestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadTest();
  }, [id]);

  const loadTest = async () => {
    try {
      const testData = await api.getTestById(id);
      setTest(testData);
      setAnswers(new Array(testData.questions.length).fill(-1));
    } catch (error) {
      console.error('Error loading test:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    // Auto advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < test!.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        submitTest();
      }
    }, 300);
  };

  const submitTest = async () => {
    try {
      const result = await api.submitTest(id, answers);
      router.push({
        pathname: '/result',
        params: {
          resultId: result.id,
          testId: id,
          shareToken: result.share_token,
          resultTitle: result.result_title,
          resultDescription: result.resultDescription,
          score: result.score.toString(),
          maxScore: result.maxScore.toString(),
        },
      });
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading || !test) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText style={styles.loadingText}>Test yükleniyor...</ThemedText>
      </ThemedView>
    );
  }

  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const isLastQuestion = currentQuestion === test.questions.length - 1;
  const hasAnswer = answers[currentQuestion] !== -1;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Geri</ThemedText>
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" style={styles.testTitle}>
          {test.title}
        </ThemedText>
        <ThemedView style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </ThemedView>
        <ThemedText style={styles.progressText}>
          Soru {currentQuestion + 1} / {test.questions.length}
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <ThemedText type="title" style={styles.questionText}>
          {question.question}
        </ThemedText>

        <ThemedView style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === index;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected,
                ]}
                onPress={() => handleAnswer(index)}>
                <ThemedText
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}>
                  {option}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      </ScrollView>

      <ThemedView style={styles.footer}>
        {currentQuestion > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={goToPrevious}>
            <ThemedText style={styles.navButtonText}>← Önceki</ThemedText>
          </TouchableOpacity>
        )}
        {isLastQuestion && hasAnswer && (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={submitTest}>
            <ThemedText style={[styles.navButtonText, styles.submitButtonText]}>
              Sonucu Gör →
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    opacity: 0.7,
  },
  testTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    marginBottom: 32,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  optionButtonSelected: {
    borderColor: '#4ECDC4',
    backgroundColor: '#4ECDC420',
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#4ECDC4',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  navButtonText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4ECDC4',
    marginLeft: 'auto',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

