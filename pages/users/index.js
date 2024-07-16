import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import style from '../../style/pages/users/Home.module.css';
import CardSuggestion from "@/components/card/CardSuggestion";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import Review from "@/components/Review";
export default function Home() {

    const router=useRouter();

    const [regions,setRegions] = useState([]);
    const getAllRegion = () =>{
        fetch("/api/region/getAll")
        .then(res=>res.json())
        .then(data=>setRegions(data))
        .catch(error=>console.log(error));
    }

    //suggestion
    const [suggestions,setSuggestions]=useState([]);
    const getSuggestion = () =>{
        fetch("/api/hotel/suggestion")
        .then(res=>res.json())
        .then(data=>setSuggestions(data))
        .catch(error=>console.log(error));
    }

    //review
    const [reviews,setReviews] = useState([]);
    const getReview = () =>{
        fetch("/api/hotel/getReview")
        .then(res=>res.json())
        .then(data=>setReviews(data))
        .catch(error=>console.log(error));
    }

    useEffect(()=>{
        if (typeof window !== "undefined") {
            getAllRegion();
            getSuggestion();
            getReview();
        }
    },[]);

    
    
    

    return(
        <>
            <Head>
                <title>Home</title>
            </Head>

            
            <div className={style.container}>

                <div className={style.suggestion_container}>
                    <span className={style.suggestion_title}>Suggestions for you</span>
                    <div className={style.suggestion_item_container}>
                        {
                            suggestions.map((suggestion,index)=>{
                                return  <CardSuggestion 
                                            key={index}
                                            image={suggestion.image}
                                            note={suggestion.note_moyenne}
                                            name={suggestion.name}
                                            localisation={suggestion.ville}
                                            description={suggestion.description}
                                            onClick={()=>{router.push("/users/accommodation/"+suggestion.id)}}
                                        />
                            })
                        }
                        
                    </div>
                    <div className={style.suggestion_bottom}>
                        <Button onClick={()=>router.push("/users/accommodation")} className="button-primary" label="See more"/>
                    </div>
                </div>
 
                <div className={style.review_container}>
                    <div className={style.review_top}>
                        <span className={style.review_title}>See the customer’s review</span>
                        <span className={style.review_subtitle}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat explicabo 
                        cupiditate laboriosam blanditiis recusandae iste
                        </span>
                    </div>
                    <div className={style.review_item_container}>
                        {
                            reviews.map((review,index)=>{
                                return  <Review
                                            key={index}
                                            rate={review.note}
                                            review={review.commentaire}
                                            username={review.username}
                                            userPhoto={review.userPhoto}
                                            localisation={review.userAdresse}
                                        />
                            })
                        }
                    </div>
                </div>

            </div>
            
            
            
        </>
    )
}