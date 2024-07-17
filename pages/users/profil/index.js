import Head from "next/head";
import UserTopbar from "@/layouts/users/UserTopbar";
import style from '@/style/pages/users/Profile.module.css';
import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { TabPanel, TabView } from "primereact/tabview";
import { Button } from "primereact/button";
export default function Profile() {



    const panelClassName = (parent, index) => {
        if (parent.state.activeIndex === index)
            return style.tab_active;
        else 
            return style.tab;
    }
    
    return(
        <div className={style.container}>
            <div className={style.menu_container}>
                <Link style={{textDecoration:"none"}} href={"/users/profil"}>
                    <span className={style.menu_active}>Profil</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/cart"}>
                    <span className={style.menu_item}>Shopping cart</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/responsable"}>
                    <span className={style.menu_item}>Responsable</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users/setting"}>
                    <span className={style.menu_item}>Setting</span>
                </Link>
                <Link style={{textDecoration:"none"}} href={"/users"}>
                    <span className={style.menu_item}>Return to home</span>
                </Link>
            </div>
 
            <div className={style.profil_container}>
                <div className={style.profil_image_container}>
                    <Avatar label="F" shape="circle" alt="user" className={style.profil_image} image="/images/users/user.jpg"/>
                    <div className={style.profil_user_info}>
                        <span className={style.profil_username}>Faneva Mamitana</span>
                        <span className={style.profil_adresse}>
                            <i className='pi pi-map-marker'/>
                            Antsirabe 110 , Madagascar MD
                        </span>
                    </div>
                </div>
                <TabView 
                    pt={{
                        root: { className: style.tab_container },
                        panelContainer:{ className: style.tab_container },
                        navContainer:{ className: style.tab_container }
                    }}
                >
                    <TabPanel 
                        header="Information" 
                        leftIcon="pi pi-user" 
                        pt={{
                            headerAction:({parent})=>({
                                className: panelClassName(parent,0)
                            }),
                            header:{ className: style.tab_container }
                        }}
                    >
                        <div className={style.info_user_container}>
                            <div className={style.info_user}>
                                <div className={style.info_user_title}>About</div>
                                <div className={style.info_user_paragraphe}>
                                Lorem ipsum dolor sit amet dolore gubergren diam sit ut eum amet ea i
                                psum diam iriure magna. Quis lorem amet eum sea eos magna erat. Rebum 
                                lorem dolore nonumy labore delenit ea ut est sadipscing amet labore era
                                t duis justo liber. Liber amet iusto labore magna aliquip clita labore. 
                                Facer dolor te elitr duo labore dolore dolore sit 
                                dolore. Stet sed invidunt magna ea invidunt commodo ea vulputate esse 
                                accusam amet elitr. Duo duis sed lorem et ea vel sanctus amet vero accu
                                sam iriure clita. Vel ipsum aliquyam et et lorem odio in rebum. Ea amet
                                ipsum lorem eum eos et dolor aliquam justo ex. At labore rebum duo jus
                                to sanctus soluta stet sadipscing.
                                </div>
                            </div>
                            <div className={style.info_user}>
                                <div className={style.info_user_title}>User information</div>
                                <div className={style.info_user_detail_container}>
                                    <div className={style.info_user_detail}>
                                        <span className={style.info_user_detail_label}>Firstname</span>
                                        <span className={style.info_user_detail_value}>Faneva</span>
                                    </div>
                                    <div className={style.info_user_detail}>
                                        <span className={style.info_user_detail_label}>Lastname</span>
                                        <span className={style.info_user_detail_value}>Mamitiana</span>
                                    </div>
                                    <div className={style.info_user_detail}>
                                        <span className={style.info_user_detail_label}>Address</span>
                                        <span className={style.info_user_detail_value}>Antsirabe 110, Madagascar MD</span>
                                    </div>
                                    <div className={style.info_user_detail}>
                                        <span className={style.info_user_detail_label}>Email</span>
                                        <span className={style.info_user_detail_value}>mamitiana@gmail.com</span>
                                    </div>
                                    <div className={style.info_user_detail}>
                                        <span className={style.info_user_detail_label}>Contact</span>
                                        <span className={style.info_user_detail_value}>034 11 092 23</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel 
                        header="Edit profil" 
                        leftIcon="pi pi-pencil"
                        pt={{
                            headerAction:({parent})=>({
                                className: panelClassName(parent,1)
                            }),
                            header:{ className: style.tab_container }
                        }}
                    >
                        <div className={style.edit_user_container}>
                            <div className={style.edit_image_container}>
                                <div className={style.edit_image}>
                                    <Avatar shape="circle" className={style.image_edit} image="/images/users/user.jpg" label="F"/>
                                    <Button icon="pi pi-pencil" className={style.button_image} rounded  aria-label="Edit photo"/>
                                </div>
                            </div>
                            <div className={style.edit_user}>
                                <span className={style.edit_title}>About</span>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Bio</span>
                                    <textarea className={style.form_textarea}/>
                                </div>
                            </div>
                            <div className={style.edit_user}>
                                <span className={style.edit_title}>User Information</span>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Firstname</span>
                                    <input  type="text" className={style.form_input}/>
                                </div>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Lastname</span>
                                    <input  type="text" className={style.form_input}/>
                                </div>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Address</span>
                                    <input  type="text" className={style.form_input}/>
                                </div>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Email</span>
                                    <input  type="email" className={style.form_input}/>
                                </div>
                                <div className={style.form_group_input}>
                                    <span className={style.form_label}>Contact</span>
                                    <input  type="tel" className={style.form_input}/>
                                </div>
                            </div>
                            <Button className="button-primary" label="Edit" icon="pi pi-pencil"/>
                        </div>

                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}




Profile.getLayout = function getLayout(page) {
    return(
        <>
            <Head>
                <title>User profile</title>
            </Head>
            <UserTopbar/>
            {page}
        </>
    );
}