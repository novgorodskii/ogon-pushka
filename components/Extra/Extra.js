import {useContext} from 'react';
import Link from 'next/link';
import Button from '../Button';
import style from "./extra.module.css";
import {ProductsContext} from '../../context/context.js';

const Top = ({title,description}) => {
  return (
    <div className={style.top}>
      <div className={style.topTitle}>{title}</div>
        <p>{description}</p>
      <Link href="/categories">
          <Button text="ДЕТАЛЬНІШЕ"/>
      </Link>
    </div>
  )
};
const ExtraItem = ({url}) => {
  return(
    <div style={{"background" : `url(${url}) center / cover`}} />
  )
};
const FullItem = ({url}) => <div style={{"background" : `url(${url}) center / cover`}} />;

const Extra = () => {
  const context = useContext(ProductsContext);
  const extra = context.home ? context.home.extra : null;
  return(
    extra?.images.length && extra.featured_image.formats ?
      <div className={style.extra}>
        <div className={style.left}>
          <Top description={extra.description} title={extra.title} />
          <div className={style.bottom}>
            {
             extra.images.length ?
              <>
                {/* <ExtraItem url={extra.images[0].formats.large.url}/> */}
                { extra.images[0]?.formats?.large.url ?
                  <ExtraItem url={extra.images[0].formats.large.url}/> : null
                }
                { extra.images[1]?.formats?.large.url ?
                  <ExtraItem url={extra.images[1].formats.large.url}/> : null
                }
              </>
              : null
            }
          </div>
        </div>
        <div className={style.right}>
          <FullItem url={extra.featured_image.formats.large.url} />
        </div>
      </div> : null
  );
};

export default Extra;