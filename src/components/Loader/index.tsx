import styles from './index.module.scss'

const Loader = () => (
  <div className={styles['loader-wrap']}>
    <div className={styles['loader']}></div>
  </div>
)

export default Loader
