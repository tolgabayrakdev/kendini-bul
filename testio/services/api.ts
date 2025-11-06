const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kendini-bul-production.up.railway.app';

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  results: Result[];
  category?: string;
  result_count?: number;
}

export interface Question {
  question: string;
  options: string[];
}

export interface Result {
  range: string;
  title: string;
  description: string;
}

export interface TestResult {
  id: string;
  test_id: string;
  score: number;
  result_title: string;
  resultDescription: string;
  share_token: string;
  maxScore: number;
}

export const api = {
  // Get all tests
  getAllTests: async (): Promise<Test[]> => {
    const response = await fetch(`${API_BASE_URL}/tests`);
    const data = await response.json();
    return data.data || [];
  },

  // Get popular tests
  getPopularTests: async (limit: number = 10): Promise<Test[]> => {
    const response = await fetch(`${API_BASE_URL}/tests/popular?limit=${limit}`);
    const data = await response.json();
    return data.data || [];
  },

  // Get random test
  getRandomTest: async (): Promise<Test> => {
    const response = await fetch(`${API_BASE_URL}/tests/random`);
    const data = await response.json();
    return data.data;
  },

  // Get test by ID
  getTestById: async (id: string): Promise<Test> => {
    const response = await fetch(`${API_BASE_URL}/tests/${id}`);
    const data = await response.json();
    return data.data;
  },

  // Get tests by category
  getTestsByCategory: async (category: string): Promise<Test[]> => {
    const response = await fetch(`${API_BASE_URL}/tests/category/${category}`);
    const data = await response.json();
    return data.data || [];
  },

  // Submit test answers
  submitTest: async (testId: string, answers: number[]): Promise<TestResult> => {
    const response = await fetch(`${API_BASE_URL}/results/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testId, answers }),
    });
    const data = await response.json();
    return data.data;
  },

  // Get result by share token
  getResultByToken: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/results/token/${token}`);
    const data = await response.json();
    return data.data;
  },
};

