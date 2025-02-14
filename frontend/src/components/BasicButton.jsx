const BasicButton = ({className, onClickHandler, title = '', ...rest}) => {
  return (
    <button className={className} onClick={onClickHandler} {...rest}>{title}</button>
  )
}

export default BasicButton