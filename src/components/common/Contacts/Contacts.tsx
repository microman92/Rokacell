import { cn } from '@/lib/utils/index';
import type { Branch } from '@/data/branches.data';
import styles from './Contacts.module.scss';

interface ContactsProps {
  data: Branch;
}

export default function Contacts({ data }: ContactsProps) {
  const isPhotoVariant = data.variant === 'photo';

  return (
    <div className={styles.contacts}>

      {/* Если фото-вариант: фоновая картинка завода */}
      {isPhotoVariant && (
        <img
          src={data.image}
          alt={data.city}
          className={styles.contacts__bg}
        />
      )}

      {/* Левая часть: Визуал */}
      <div className={cn(
        styles.contacts__visual,
        isPhotoVariant ? styles['contacts__visual--photo'] : styles['contacts__visual--products']
      )}>
        {/* Логотип */}
        {data.logo && (
          <img
            src={data.logo}
            alt="Rokacell Logo"
            className={cn(
              styles.contacts__logo,
              isPhotoVariant && styles['contacts__logo--overlay']
            )}
          />
        )}



        {/* Если продукт-вариант: картинка продукции */}
        {!isPhotoVariant && (
          <img
            src={data.image}
            alt={`${data.city} products`}
            className={styles.contacts__productImage}
          />
        )}
      </div>
      {/* background: rgba(33, 89, 123, 0.8); */}
      {/* Правая часть: Инфо */}
      <div className={cn(styles.contacts__info, isPhotoVariant && styles['photo'])}>
        <h3 className={styles.contacts__city}>{data.city}</h3>
        {data.address && (
          <p className={styles.contacts__address}>{data.address}</p>
        )}
        <p className={styles.contacts__email}>{data.email}</p>
        {data.phones.map((phone, i) => (
          <p key={i} className={styles.contacts__phones}>{phone}</p>
        ))}
      </div>
    </div>
  );
}
