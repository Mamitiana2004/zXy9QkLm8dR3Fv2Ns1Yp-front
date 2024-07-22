import { Button } from "primereact/button";
import style from '@/style/components/button/GoogleButton.module.css'
import { Image } from "primereact/image";
import { useTranslation } from "react-i18next";
export default function GoogleButton() {

    const {t} = useTranslation();

    return(
        <Button className={style.button_container}>
            <Image imageClassName={style.image_google} src="/images/google.png"/>
            <span>{t("sign_in_with_google")}</span>
        </Button>
    );
}