// notification.js - 通知機能

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.loadNotifications();
    }

    // 新しい通知を追加
    addNotification(type, message, data = {}) {
        const notification = {
            id: Date.now(),
            type: type,
            message: message,
            data: data,
            read: false,
            createdAt: new Date().toISOString()
        };

        this.notifications.unshift(notification);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.showNotificationPopup(notification);
    }

    // メッセージ通知
    addMessageNotification(fromUser, message) {
        this.addNotification('message', `${fromUser}さんからメッセージが届きました`, {
            fromUser: fromUser,
            message: message,
            link: 'message.html'
        });
    }

    // 交換リクエスト通知
    addExchangeRequestNotification(fromUser, bookTitle) {
        this.addNotification('exchange_request', `${fromUser}さんから「${bookTitle}」の交換リクエストが届きました`, {
            fromUser: fromUser,
            bookTitle: bookTitle,
            link: 'message.html'
        });
    }

    // 交換承認通知
    addExchangeAcceptedNotification(fromUser, bookTitle) {
        this.addNotification('exchange_accepted', `${fromUser}さんが「${bookTitle}」の交換を承認しました`, {
            fromUser: fromUser,
            bookTitle: bookTitle,
            link: 'message.html'
        });
    }

    // 交換拒否通知
    addExchangeRejectedNotification(fromUser, bookTitle) {
        this.addNotification('exchange_rejected', `${fromUser}さんが「${bookTitle}」の交換を拒否しました`, {
            fromUser: fromUser,
            bookTitle: bookTitle,
            link: 'message.html'
        });
    }

    // 通知を既読にする
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationBadge();
        }
    }

    // 全ての通知を既読にする
    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.saveNotifications();
        this.updateNotificationBadge();
    }

    // 未読の通知を取得
    getUnreadNotifications() {
        return this.notifications.filter(n => !n.read);
    }

    // 通知バッジを更新
    updateNotificationBadge() {
        const unreadCount = this.getUnreadNotifications().length;
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    // 通知ポップアップを表示
    showNotificationPopup(notification) {
        const popup = document.createElement('div');
        popup.className = 'notification-popup';
        popup.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${this.getNotificationIcon(notification.type)}</div>
                <div class="notification-message">${notification.message}</div>
            </div>
        `;

        document.body.appendChild(popup);

        // 3秒後に非表示
        setTimeout(() => {
            popup.classList.add('notification-popup-hide');
            setTimeout(() => popup.remove(), 300);
        }, 3000);
    }

    // 通知アイコンを取得
    getNotificationIcon(type) {
        const icons = {
            message: '💬',
            exchange_request: '🔄',
            exchange_accepted: '✅',
            exchange_rejected: '❌'
        };
        return icons[type] || '📢';
    }

    // 通知をローカルストレージに保存
    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    // 通知をローカルストレージから読み込み
    loadNotifications() {
        const data = localStorage.getItem('notifications');
        this.notifications = data ? JSON.parse(data) : [];
    }
}

// グローバルで使用できるようにインスタンスを作成
const notification = new NotificationManager();

// CSSスタイルを追加
const style = document.createElement('style');
style.textContent = `
    .notification-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ef4444;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    }

    .notification-popup {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .notification-popup-hide {
        animation: slideOut 0.3s ease-in;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-icon {
        font-size: 1.5rem;
    }

    .notification-message {
        color: #1f2937;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

document.head.appendChild(style);
