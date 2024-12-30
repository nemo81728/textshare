// admin.js - 管理者機能

class AdminManager {
    constructor() {
        this.isAdmin = false;
        this.checkAdminStatus();
    }

    // 管理者権限チェック
    checkAdminStatus() {
        const user = auth.getCurrentUser();
        if (user && user.role === 'admin') {
            this.isAdmin = true;
        }
    }

    // ユーザー一覧取得（モック）
    getUsers() {
        return [
            {
                id: 1,
                name: "山田太郎",
                email: "yamada@example.com",
                university: "東京大学",
                status: "active",
                registeredAt: "2024-01-15",
                lastLogin: "2024-03-25"
            },
            {
                id: 2,
                name: "佐藤花子",
                email: "sato@example.com",
                university: "慶應大学",
                status: "suspended",
                registeredAt: "2024-02-01",
                lastLogin: "2024-03-20"
            }
        ];
    }

    // 利用統計取得（モック）
    getStatistics() {
        return {
            totalUsers: 150,
            activeUsers: 120,
            totalBooks: 450,
            totalExchanges: 200,
            dailyActiveUsers: 45,
            pendingReports: 3,
            statistics: {
                users: [30, 45, 60, 75, 90, 120, 150],
                exchanges: [10, 25, 50, 80, 120, 160, 200],
                reports: [1, 2, 4, 3, 5, 2, 3]
            }
        };
    }

    // 違反報告一覧取得（モック）
    getReports() {
        return [
            {
                id: 1,
                reporterId: 1,
                reportedUserId: 3,
                type: "inappropriate_content",
                description: "不適切な商品説明",
                status: "pending",
                createdAt: "2024-03-24"
            },
            {
                id: 2,
                reporterId: 2,
                reportedUserId: 4,
                type: "spam",
                description: "スパムメッセージの送信",
                status: "resolved",
                createdAt: "2024-03-23"
            }
        ];
    }

    // ユーザーの状態を変更
    updateUserStatus(userId, status) {
        // 実際のAPIでは、サーバーにリクエストを送信
        console.log(`Updating user ${userId} status to ${status}`);
        return true;
    }

    // 違反報告の対応
    handleReport(reportId, action) {
        // 実際のAPIでは、サーバーにリクエストを送信
        console.log(`Handling report ${reportId} with action: ${action}`);
        return true;
    }

    // 管理者ログの取得（モック）
    getAdminLogs() {
        return [
            {
                id: 1,
                adminId: 1,
                action: "user_suspended",
                target: "user/123",
                description: "不適切な行為によりユーザーを一時停止",
                createdAt: "2024-03-25 14:30:00"
            },
            {
                id: 2,
                adminId: 1,
                action: "report_resolved",
                target: "report/456",
                description: "違反報告を対応済みとしてマーク",
                createdAt: "2024-03-25 13:15:00"
            }
        ];
    }

    // ユーザーの詳細情報取得（モック）
    getUserDetails(userId) {
        return {
            id: userId,
            name: "山田太郎",
            email: "yamada@example.com",
            university: "東京大学",
            registeredBooks: 5,
            completedExchanges: 3,
            reportCount: 0,
            lastLogin: "2024-03-25 14:30:00",
            status: "active"
        };
    }

    // 管理者権限の確認
    requireAdmin() {
        if (!this.isAdmin) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// グローバルで使用できるようにインスタンスを作成
const admin = new AdminManager();
