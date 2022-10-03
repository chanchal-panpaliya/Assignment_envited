import "./SharePage.css"
const SharePage = ({data}) =>{
  return(
        <div>
            <section>
                <label> Share Post Link </label>
            </section>
            <section className="share-Page">
                <a class="share-btn share-btn-email" href={`mailto:?subject=${data.title} ${data.episode_id}&body=https://${window.location.hostname}/${data.userId}/post/${data._id}`} title="Share via Email">
                <i class="fa-solid fa-envelope share-icon"></i>
                </a>
                <a class="share-btn share-btn-branded share-btn-twitter"
                href={`https://twitter.com/share?url=https://${window.location.hostname}/${data.userId}/post/${data._id}&text=${data.title}&via=${'disney+bluestar'}`}
                title="Share on Twitter">
                    <i class="fa-brands fa-twitter-square share-icon"></i>
                </a>
                <a class="share-btn share-btn-branded share-btn-facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://${window.location.hostname}/${data.userId}/post/${data._id}`}
                title="Share on Facebook">
                    <i class="fa-brands fa-facebook-square share-icon"></i>
                </a>
                <a class="share-btn share-btn-branded share-btn-linkedin"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://${window.location.hostname}/${data.userId}/post/${data._id}`}
                title="Share on LinkedIn">
                    <i class="fa-brands fa-linkedin share-icon"></i>
                </a>
          </section>
      </div>
      
  )
}

export default SharePage;