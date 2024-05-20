export function playNotificationSound() {
    const audio = new Audio(require('@/assets/sounds/msg-alert.mp3'));
    audio.play();
}