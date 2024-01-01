import styles from './videoDataLoader.module.css'

export function VideoDataLoader() {
  return (
    <> 
      <div className={styles.videoTitle}>
        <div className={styles.loadWrapper}>
          <div className={styles.activity}></div>
        </div>
      </div>
      <div className={styles.videoChannel}>
        <div className={styles.channelAvatar}>
          <div className={styles.loadWrapper + ' ' + styles.circular}>
            <div className={styles.activity}></div>
          </div>
        </div>
        <div className={styles.channelTitle}>
          <div className={styles.loadWrapper}>
            <div className={styles.activity}></div>
          </div>
        </div>
      </div>
      <div className={styles.videoDescription}>
        <div className={styles.loadWrapper}>
          <div className={styles.activity}></div>
        </div>
      </div>
    </>
  )
}