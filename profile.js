// profile.js - プロフィール管理機能

class ProfileManager {
    constructor() {
        this.defaultAvatar = '👤';
    }

    // プロフィール更新
    updateProfile(userData) {
        const user = auth.getCurrentUser();
        if (!user) return false;

        // バリデーション
        if (!userData.name || !userData.email || !userData.university) {
            throw new Error('必須項目が入力されていません');
        }

        // メールアドレスの形式チェック
        if (!this.validateEmail(userData.email)) {
            throw new Error('メールアドレスの形式が正しくありません');
        }

        // プロフィール更新
        auth.updateUserInfo({
            ...user,
            ...userData
        });

        return true;
    }

    // パスワード変更
    changePassword(currentPassword, newPassword, confirmPassword) {
        // パスワードの一致確認
        if (newPassword !== confirmPassword) {
            throw new Error('新しいパスワードが一致しません');
        }

        // パスワードの強度チェック
        if (!this.validatePassword(newPassword)) {
            throw new Error('パスワードは8文字以上で、英数字を含める必要があります');
        }

        // 実際のAPIでは現在のパスワードを確認
        // ここではモック
        return true;
    }

    // アバター画像のアップロード
    uploadAvatar(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('ファイルが選択されていません'));
                return;
            }

            // ファイルサイズチェック（2MB以下）
            if (file.size > 2 * 1024 * 1024) {
                reject(new Error('ファイルサイズは2MB以下にしてください'));
                return;
            }

            // 画像形式チェック
            if (!file.type.startsWith('image/')) {
                reject(new Error('画像ファイルを選択してください'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const user = auth.getCurrentUser();
                auth.updateUserInfo({
                    ...user,
                    avatar: e.target.result
                });
                resolve(e.target.result);
            };
            reader.onerror = () => {
                reject(new Error('画像の読み込みに失敗しました'));
            };
            reader.readAsDataURL(file);
        });
    }

    // アバター画像の削除
    removeAvatar() {
        const user = auth.getCurrentUser();
        auth.updateUserInfo({
            ...user,
            avatar: this.defaultAvatar
        });
        return true;
    }

    // メールアドレスのバリデーション
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // パスワードのバリデーション
    validatePassword(password) {
        // 8文字以上、英数字を含む
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    }

    // 大学メールアドレスかチェック（.ac.jpドメイン）
    isUniversityEmail(email) {
        return email.endsWith('.ac.jp');
    }
}

// グローバルで使用できるようにインスタンスを作成
const profile = new ProfileManager();
