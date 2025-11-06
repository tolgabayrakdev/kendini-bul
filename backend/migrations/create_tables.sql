-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    results JSONB NOT NULL,
    category TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create test_results table
CREATE TABLE IF NOT EXISTS test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    score INT NOT NULL,
    result_title TEXT NOT NULL,
    share_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for popular tests (by result count)
CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results(test_id);
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results(created_at);
CREATE INDEX IF NOT EXISTS idx_tests_category ON tests(category);

-- Insert sample tests
INSERT INTO tests (title, description, questions, results, category) VALUES
(
    'Sen hangi kahve türüsün?',
    'Kişiliğine en uygun kahve türünü keşfet!',
    '[
        {
            "question": "Sabah uyandığında ilk ne yaparsın?",
            "options": ["Hemen kahve yaparım", "Biraz uyanmaya çalışırım", "Spor yaparım", "Duş alırım"]
        },
        {
            "question": "Kahve içerken ne yapmayı seversin?",
            "options": ["Kitap okumak", "Arkadaşlarla sohbet", "Yalnız düşünmek", "İş yapmak"]
        },
        {
            "question": "Hangi ortamı tercih edersin?",
            "options": ["Sessiz kafe", "Kalabalık mekan", "Ev ortamı", "Açık hava"]
        },
        {
            "question": "Kahveni nasıl içersin?",
            "options": ["Sade", "Az şekerli", "Bol sütlü", "Aromalı"]
        }
    ]'::jsonb,
    '[
        {"range": "0-4", "title": "Espresso", "description": "Güçlü, kararlı ve odaklanmış birisin! Sen tam bir espresso karakterisin."},
        {"range": "5-8", "title": "Cappuccino", "description": "Dengeli ve sosyal birisin. Cappuccino gibi hem güçlü hem yumuşaksın!"},
        {"range": "9-12", "title": "Latte", "description": "Yumuşak ve sıcakkanlı birisin. Latte gibi rahatlatıcı bir karakterin var."},
        {"range": "13-16", "title": "Americano", "description": "Sade ve pratik birisin. Americano gibi net ve anlaşılır bir kişiliğin var."}
    ]'::jsonb,
    'kişilik'
),
(
    'Kişiliğin % kaç maceraperest?',
    'Maceraperestlik seviyeni öğren!',
    '[
        {
            "question": "Yeni bir şehre gittiğinde ne yaparsın?",
            "options": ["Planlı turistik yerleri gezerim", "Kaybolmayı göze alarak keşfederim", "Rehber kitabı takip ederim", "Yerel insanlarla konuşurum"]
        },
        {
            "question": "Bilinmeyen bir yemek görürsen?",
            "options": ["Hemen denerim", "Önce araştırırım", "Tanıdık şeyler tercih ederim", "Arkadaşlarıma sorarım"]
        },
        {
            "question": "Hafta sonu planın ne?",
            "options": ["Evde dinlenmek", "Yeni bir aktivite denemek", "Arkadaşlarla buluşmak", "Spor yapmak"]
        },
        {
            "question": "Risk almayı sever misin?",
            "options": ["Evet, hayatın tadı bu", "Bazen, mantıklıysa", "Hayır, güvenli tarafta olmayı tercih ederim", "Duruma göre değişir"]
        }
    ]'::jsonb,
    '[
        {"range": "0-4", "title": "%20 Maceraperest", "description": "Güvenli tarafta kalmayı tercih ediyorsun. Ama bazen küçük riskler almak güzel olabilir!"},
        {"range": "5-8", "title": "%50 Maceraperest", "description": "Dengeli birisin. Hem güvenli hem de maceracı yanların var!"},
        {"range": "9-12", "title": "%75 Maceraperest", "description": "Oldukça maceracı birisin! Yeni deneyimler seni heyecanlandırıyor."},
        {"range": "13-16", "title": "%100 Maceraperest", "description": "Tam bir maceraperestsin! Hayatın her anını dolu dolu yaşıyorsun."}
    ]'::jsonb,
    'kişilik'
),
(
    'Hangi dizinin karakterisin?',
    'En sevdiğin dizilerden hangisinin karakterine benziyorsun?',
    '[
        {
            "question": "Bir problemle karşılaştığında ne yaparsın?",
            "options": ["Hemen çözüm ararım", "Arkadaşlarıma danışırım", "Düşünür ve planlarım", "Sezgilerime güvenirim"]
        },
        {
            "question": "Sosyal ortamda nasılsın?",
            "options": ["Çok konuşkanım", "Dinlemeyi severim", "Ortada bir yerdeyim", "Duruma göre değişir"]
        },
        {
            "question": "Hangi tür hikayeleri seversin?",
            "options": ["Aksiyon/Macera", "Drama/Duygusal", "Komedi/Eğlenceli", "Gizem/Gerilim"]
        },
        {
            "question": "İdeal akşamın nasıl?",
            "options": ["Arkadaşlarla dışarıda", "Evde dizi/film izlemek", "Kitap okumak", "Yeni bir şeyler öğrenmek"]
        }
    ]'::jsonb,
    '[
        {"range": "0-4", "title": "Sherlock Holmes", "description": "Analitik düşünce gücün ve detaylara dikkatin seni Sherlock yapıyor!"},
        {"range": "5-8", "title": "Friends Karakteri", "description": "Sosyal, eğlenceli ve arkadaş canlısısın. Tam bir Friends karakterisin!"},
        {"range": "9-12", "title": "Game of Thrones Karakteri", "description": "Stratejik düşünüyorsun ve güçlü bir karakterin var!"},
        {"range": "13-16", "title": "The Office Karakteri", "description": "Mizah anlayışın ve rahat tavrınla tam bir The Office karakterisin!"}
    ]'::jsonb,
    'eğlence'
),
(
    'Gizli IQ seviyeni ölçelim!',
    'Zeka seviyeni keşfet (eğlence amaçlı)',
    '[
        {
            "question": "Bir dizi sayı görürsen ne yaparsın?",
            "options": ["Hemen bir pattern ararım", "Sayıları sayarım", "Görmezden gelirim", "Not alırım"]
        },
        {
            "question": "Yeni bir dil öğrenmek?",
            "options": ["Çok kolay gelir", "Zor ama keyifli", "Çok zor", "Hiç ilgilenmem"]
        },
        {
            "question": "Bulmaca çözmeyi sever misin?",
            "options": ["Evet, günlük rutinim", "Ara sıra", "Nadiren", "Hiç sevmem"]
        },
        {
            "question": "Problem çözerken nasıl yaklaşırsın?",
            "options": ["Farklı açılardan düşünürüm", "Adım adım ilerlerim", "Sezgilerime güvenirim", "Yardım isterim"]
        }
    ]'::jsonb,
    '[
        {"range": "0-4", "title": "IQ: 90-110", "description": "Ortalama zeka seviyesindesin. Ama unutma, zeka sadece sayılardan ibaret değil!"},
        {"range": "5-8", "title": "IQ: 110-130", "description": "Yüksek zeka seviyesindesin! Analitik düşünce gücün güçlü."},
        {"range": "9-12", "title": "IQ: 130-150", "description": "Çok yüksek zeka seviyesindesin! Problem çözme yeteneğin harika."},
        {"range": "13-16", "title": "IQ: 150+", "description": "Üstün zeka seviyesindesin! Dahi seviyesinde bir zekaya sahipsin."}
    ]'::jsonb,
    'eğlence'
)
ON CONFLICT DO NOTHING;

