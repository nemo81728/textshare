// auth.js - 認証管理用スクリプト

// ユーザー情報を管理するクラス
class Auth {
    constructor() {
        this.isLoggedIn = false;
        this.user = null;
        this.checkLoginStatus();
    }

    // ログイン状態をチェック
    checkLoginStatus() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            this.user = JSON.parse(userStr);
            this.isLoggedIn = true;
        }
    }

    // ログイン処理
    login(email, password) {
        // 実際のAPIでは、サーバーに認証リクエストを送信
        // ここではモックデータを使用
        if (email && password) {
            const mockUser = {
                id: 1,
                name: "山田太郎",
                email: email,
                university: "東京大学"
            };
            localStorage.setItem('user', JSON.stringify(mockUser));
            this.user = mockUser;
            this.isLoggedIn = true;
            return true;
        }
        return false;
    }

    // ログアウト処理
    logout() {
        localStorage.removeItem('user');
        this.user = null;
        this.isLoggedIn = false;
        window.location.href = 'index.html';
    }

    // 認証必須ページの保護
    requireAuth() {
        if (!this.isLoggedIn) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // 現在のユーザー情報を取得
    getCurrentUser() {
        return this.user;
    }

    // ログイン状態を取得
    isAuthenticated() {
        return this.isLoggedIn;
    }

    // ユーザー情報を更新
    updateUserInfo(userData) {
        this.user = { ...this.user, ...userData };
        localStorage.setItem('user', JSON.stringify(this.user));
    }
}

// グローバルで使用できるように認証インスタンスを作成
const auth = new Auth();

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', () => {
    // ログイン状態に応じてヘッダーのボタンを変更
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) {
        if (auth.isAuthenticated()) {
            navButtons.innerHTML = `
                <a href="book-register.html" class="btn btn-outline">教科書を登録</a>
                <a href="books.html" class="btn btn-outline">教科書を探す</a>
                <a href="message.html" class="btn btn-outline">メッセージ</a>
                <a href="mypage.html" class="btn btn-outline">マイページ</a>
                <button onclick="auth.logout()" class="btn btn-primary">ログアウト</button>
            `;
        }
    }
});
