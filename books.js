// books.js - 教科書検索・フィルター機能

class BookManager {
    constructor() {
        this.books = [];
        this.filteredBooks = [];
        this.loadBooks();
    }

    // 検索とフィルタリング
    filterBooks(options = {}) {
        let results = this.books;

        // キーワード検索
        if (options.keyword) {
            const keyword = options.keyword.toLowerCase();
            results = results.filter(book => 
                book.title.toLowerCase().includes(keyword) ||
                book.author.toLowerCase().includes(keyword) ||
                book.description.toLowerCase().includes(keyword)
            );
        }

        // 学部フィルター
        if (options.department) {
            results = results.filter(book => 
                book.department === options.department
            );
        }

        // 状態フィルター
        if (options.condition) {
            results = results.filter(book => 
                book.condition === options.condition
            );
        }

        // 教科フィルター
        if (options.subject) {
            results = results.filter(book => 
                book.subject === options.subject
            );
        }

        // 並び替え
        if (options.sort) {
            switch (options.sort) {
                case 'new':
                    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'price-low':
                    results.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    results.sort((a, b) => b.price - a.price);
                    break;
                case 'title':
                    results.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }
        }

        this.filteredBooks = results;
        return results;
    }

    // 教科書データの読み込み（モック）
    loadBooks() {
        this.books = [
            {
                id: 1,
                title: '経済学入門 第3版',
                author: '山田太郎',
                department: 'economics',
                departmentName: '経済学部',
                subject: 'economics-basic',
                subjectName: '経済学基礎',
                condition: 'good',
                conditionName: '良好',
                price: 2000,
                description: '経済学の基礎を学ぶための教科書です。',
                createdAt: '2024-03-25T10:00:00Z'
            },
            {
                id: 2,
                title: '線形代数学',
                author: '鈴木一郎',
                department: 'science',
                departmentName: '理学部',
                subject: 'mathematics',
                subjectName: '数学',
                condition: 'new',
                conditionName: '新品同様',
                price: 3000,
                description: '線形代数の基礎から応用までカバーしています。',
                createdAt: '2024-03-24T15:30:00Z'
            }
            // 実際のAPIでは、サーバーからデータを取得
        ];
        this.filteredBooks = [...this.books];
    }

    // 学部一覧の取得
    getDepartments() {
        return [
            { id: 'literature', name: '文学部' },
            { id: 'economics', name: '経済学部' },
            { id: 'science', name: '理学部' },
            { id: 'engineering', name: '工学部' }
        ];
    }

    // 教科一覧の取得
    getSubjects() {
        return [
            { id: 'economics-basic', name: '経済学基礎', department: 'economics' },
            { id: 'mathematics', name: '数学', department: 'science' },
            { id: 'physics', name: '物理学', department: 'science' },
            { id: 'literature', name: '文学', department: 'literature' }
        ];
    }

    // 状態一覧の取得
    getConditions() {
        return [
            { id: 'new', name: '新品同様' },
            { id: 'good', name: '良好' },
            { id: 'fair', name: '普通' }
        ];
    }

    // 並び替えオプションの取得
    getSortOptions() {
        return [
            { id: 'new', name: '新着順' },
            { id: 'price-low', name: '価格が安い順' },
            { id: 'price-high', name: '価格が高い順' },
            { id: 'title', name: 'タイトル順' }
        ];
    }
}

// グローバルで使用できるようにインスタンスを作成
const bookManager = new BookManager();
