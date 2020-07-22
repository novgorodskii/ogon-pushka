import style from './CatalogItem.module.css';
import Button from '../Button';

const CatalogItem = ({url, title}) => {
  return(
    <div className={style.catalogItem} style={{"background" : `url(${url}) center / cover`}}>
      <div className={style.button}>
        <div className={style.itemTitle}>{title}</div>
        <Button text="Подробнее" />
      </div>
    </div>
  )
};

export default CatalogItem;