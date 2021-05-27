import PropTypes from 'prop-types'
import styles from './Button.module.scss'

export function Button(props) {
  const { onClick, text, ...rest } = props
  return <input className={styles.Button} type="button" value={text} onClick={onClick} {...rest} />
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
