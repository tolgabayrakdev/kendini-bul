import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { api, Test } from '@/services/api';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const emojis = ['☕', '🌍', '🎬', '🧩', '💫', '🎯', '🌟', '🎨'];

export default function HomeScreen() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const loadTests = async () => {
    try {
      const popularTests = await api.getPopularTests(20);
      setTests(popularTests);
    } catch (error) {
      console.error('Error loading tests:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadTests();
  };

  const getEmoji = (index: number) => {
    return emojis[index % emojis.length];
  };

  const getRandomColor = (index: number) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
      '#F8B739', '#6C5CE7', '#A29BFE', '#FD79A8',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText style={styles.loadingText}>Testler yükleniyor...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Testio
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Kişiliğini keşfet, sonuçlarını paylaş! 🎯
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {tests.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              Henüz test bulunmuyor. Yakında eklenecek!
            </ThemedText>
          </ThemedView>
        ) : (
          tests.map((test, index) => (
            <TouchableOpacity
              key={test.id}
              style={[
                styles.testCard,
                { backgroundColor: getRandomColor(index) + '20' },
              ]}
              onPress={() => router.push(`/test/${test.id}`)}>
              <ThemedView style={styles.testCardContent}>
                <ThemedText style={styles.testEmoji}>
                  {getEmoji(index)}
                </ThemedText>
                <ThemedView style={styles.testInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.testTitle}>
                    {test.title}
                  </ThemedText>
                  {test.description && (
                    <ThemedText style={styles.testDescription} numberOfLines={2}>
                      {test.description}
                    </ThemedText>
                  )}
                  {test.result_count !== undefined && (
                    <ThemedText style={styles.testCount}>
                      {test.result_count} kişi çözdü
                    </ThemedText>
                  )}
                </ThemedView>
              </ThemedView>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
  },
  testCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  testCardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  testEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  testInfo: {
    flex: 1,
  },
  testTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  testDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  testCount: {
    fontSize: 12,
    opacity: 0.6,
  },
});
