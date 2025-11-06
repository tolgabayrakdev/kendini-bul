import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  View,
  Text,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8B739', '#6C5CE7', '#A29BFE', '#FD79A8',
];

const emojis = ['☕', '🌍', '🎬', '🧩', '💫', '🎯', '🌟', '🎨'];

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    resultId: string;
    testId: string;
    shareToken: string;
    resultTitle: string;
    resultDescription: string;
    score: string;
    maxScore: string;
  }>();

  const [cardColor, setCardColor] = useState(colors[0]);
  const [emoji, setEmoji] = useState(emojis[0]);
  const router = useRouter();

  useEffect(() => {
    // Random color and emoji for visual variety
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setCardColor(randomColor);
    setEmoji(randomEmoji);
  }, []);

  const shareUrl = `https://testio.app/result/${params.shareToken}`;
  const shareText = `Testio'da "${params.resultTitle}" sonucunu aldım! ${params.resultDescription}\n\n${shareUrl}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: shareText,
        title: 'Testio Sonucum',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      // Try to use expo-clipboard, fallback to share if not available
      try {
        const Clipboard = await import('expo-clipboard');
        await Clipboard.setStringAsync(shareUrl);
        alert('Link kopyalandı!');
      } catch {
        // Fallback: use Share API to copy
        await Share.share({
          message: shareUrl,
          title: 'Testio Sonuç Linki',
        });
      }
    } catch (error) {
      console.error('Error copying:', error);
      alert('Link kopyalanamadı. Lütfen manuel olarak kopyalayın: ' + shareUrl);
    }
  };

  const percentage = Math.round((parseInt(params.score) / parseInt(params.maxScore)) * 100);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <ThemedView
          style={[
            styles.resultCard,
            { backgroundColor: cardColor + '20', borderColor: cardColor },
          ]}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <ThemedText type="title" style={styles.resultTitle}>
            {params.resultTitle}
          </ThemedText>
          <ThemedText style={styles.resultDescription}>
            {params.resultDescription}
          </ThemedText>
          <ThemedView style={styles.scoreContainer}>
            <ThemedText style={styles.scoreText}>
              Skor: {params.score} / {params.maxScore}
            </ThemedText>
            <View style={styles.percentageBar}>
              <View
                style={[
                  styles.percentageFill,
                  { width: `${percentage}%`, backgroundColor: cardColor },
                ]}
              />
            </View>
            <ThemedText style={styles.percentageText}>%{percentage}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: cardColor }]}
            onPress={handleShare}>
            <ThemedText style={styles.actionButtonText}>
              📤 Sosyal Medyada Paylaş
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleCopyLink}>
            <ThemedText style={[styles.actionButtonText, styles.secondaryButtonText]}>
              🔗 Linki Kopyala
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => router.push('/')}>
            <ThemedText style={[styles.actionButtonText, styles.secondaryButtonText]}>
              🏠 Ana Sayfaya Dön
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={async () => {
              router.push('/');
              // Small delay to ensure navigation completes
              setTimeout(() => {
                router.push('/(tabs)/explore');
              }, 100);
            }}>
            <ThemedText style={[styles.actionButtonText, styles.secondaryButtonText]}>
              🎲 Yeni Test Keşfet
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  resultCard: {
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    borderWidth: 3,
    alignItems: 'center',
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    opacity: 0.9,
  },
  scoreContainer: {
    width: '100%',
    marginTop: 16,
  },
  scoreText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
    textAlign: 'center',
  },
  percentageBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  percentageFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  secondaryButtonText: {
    color: undefined,
  },
});

