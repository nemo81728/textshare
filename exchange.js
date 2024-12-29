// exchange.js - 教科書交換機能

class Exchange {
    constructor() {
        // 交換状態の定数
        this.STATUS = {
            PENDING: 'pending',
            ACCEPTED: 'accepted',
            REJECTED: 'rejected',
            COMPLETED: 'completed'
        };

        // モックデータ（実際はサーバーから取得）
        this.exchanges = [];
    }

    // 交換リクエストを送信
    sendRequest(bookId, message) {
        const user = auth.getCurrentUser();
        if (!user) return null;

        const exchange = {
            id: Date.now(),
            bookId: bookId,
            requesterId: user.id,
            ownerId: this.getBookOwner(bookId),
            message: message,
            status: this.STATUS.PENDING,
            createdAt: new Date().toISOString()
        };

        this.exchanges.push(exchange);
        this.saveExchanges();

        return exchange;
    }

    // リクエストを承認
    acceptRequest(exchangeId) {
        const exchange = this.exchanges.find(e => e.id === exchangeId);
        if (exchange) {
            exchange.status = this.STATUS.ACCEPTED;
            exchange.updatedAt = new Date().toISOString();
            this.saveExchanges();
            return true;
        }
        return false;
    }

    // リクエストを拒否
    rejectRequest(exchangeId) {
        const exchange = this.exchanges.find(e => e.id === exchangeId);
        if (exchange) {
            exchange.status = this.STATUS.REJECTED;
            exchange.updatedAt = new Date().toISOString();
            this.saveExchanges();
            return true;
        }
        return false;
    }

    // 交換を完了
    completeExchange(exchangeId) {
        const exchange = this.exchanges.find(e => e.id === exchangeId);
        if (exchange && exchange.status === this.STATUS.ACCEPTED) {
            exchange.status = this.STATUS.COMPLETED;
            exchange.completedAt = new Date().toISOString();
            this.saveExchanges();
            return true;
        }
        return false;
    }

    // ユーザーの交換リクエスト一覧を取得
    getUserRequests(userId) {
        return this.exchanges.filter(e => 
            e.requesterId === userId || e.ownerId === userId
        );
    }

    // 保留中のリクエストを取得
    getPendingRequests(userId) {
        return this.exchanges.filter(e => 
            e.ownerId === userId && e.status === this.STATUS.PENDING
        );
    }

    // 交換データをローカルストレージに保存
    saveExchanges() {
        localStorage.setItem('exchanges', JSON.stringify(this.exchanges));
    }

    // 交換データをローカルストレージから読み込み
    loadExchanges() {
        const data = localStorage.getItem('exchanges');
        this.exchanges = data ? JSON.parse(data) : [];
    }

    // 教科書の所有者ID取得（モック）
    getBookOwner(bookId) {
        // 実際はサーバーから取得
        return 2; // ダミーの所有者ID
    }

    // 交換状態に応じたステータスラベルを取得
    getStatusLabel(status) {
        const labels = {
            [this.STATUS.PENDING]: '承認待ち',
            [this.STATUS.ACCEPTED]: '承認済み',
            [this.STATUS.REJECTED]: '拒否',
            [this.STATUS.COMPLETED]: '完了'
        };
        return labels[status] || status;
    }
}

// グローバルで使用できるようにインスタンスを作成
const exchange = new Exchange();

// 初期データの読み込み
exchange.loadExchanges();
