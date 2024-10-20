import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import imageBienEtre from '../../assets/images/image.jpg';
import imageNutrition from '../../assets/images/nutrition-image.png';
import musculationImage from '../../assets/images/musculation.png';
import fitnessImage from '../../assets/images/fit-femme.png';
import preparationImage from '../../assets/images/preparation.png';
import profile1 from '../../assets/images/profile.png';
import profile2 from '../../assets/images/profile.png';
import profile3 from '../../assets/images/profile.png';
import fruitSaladImage from '../../assets/images/salade-image.png';
import anotherRecipeImage from '../../assets/images/viande-image.png';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
function Home() {
  const navigate = useNavigate(); 
  return (
    <div>
      {/* Menu */}
      <Header />
    
      {/* Bannière avec image de fond */}
      
      <div className="banner-placeholder">
      <div className='banner-color'>
        <h1 className="text-center">Vivez les merveilles du sport chez vous</h1>
     
        <div className='auth-button'>
          <button onClick={() => navigate('/register')}>S'inscrire</button>
          <button onClick={() => navigate('/login')}>Se connecter</button>
        </div>

        {/* Espace de Recherche */}
        <div className='espace-recherche'>
          <select className="search-inputs-coach">
            <option value="musculation">Musculation</option>
            <option value="fitness">Fitness</option>
            <option value="preparation-physique">Préparation physique</option>
          </select>

          <input
            type="text"
            className="search-inputs-coach"
            placeholder="Rechercher par ville"
          />

          <button className="search-button">
            <i className="fas fa-search search-icon"></i> Rechercher
          </button>
        </div>
      </div>
      </div>
      {/* Section Alflux Présentation */}
      <h2 className="text-center">Pourquoi choisir Alflux ?</h2>
      
      <div className='circles'>
        <div className='cercle1'></div>
        <div className='cercle2'></div>
      </div>

      {/* Conteneur pour la carte et le texte */}
      <div className="alflux-presentation">
        <div className="card-texte-container"> 
          <div className='card-section2'>
            <img src={imageBienEtre} alt="Bien-être physique" className="image-style" />
            <div className="text-overlay">
              <div className="form-oblic"></div>
              <h4>Bien être physique</h4>
              <p>Le Sport accessible à tous</p>
            </div>
          </div>
          <div className='form-oval'></div>
          <div className='section-texte'>
            <p>Alflux offre des entraînements personnalisés avec des coachs pour intégrer le sport dans votre quotidien.</p>
          </div>
        </div>
      </div>

      {/* Deuxième conteneur inversé */}
      <div className="alflux-presentation inverse">
        <div className="card-texte-container"> 
          {/* Inverser l'ordre des éléments ici */}
          <div className='form-oval2'></div>
          <div className='section-texte'>
            <p>Entraînements adaptés à tous les niveaux et objectifs pour un bien-être durable.</p>
          </div>
          <div className='card-section2'>
            <img src={imageNutrition} alt="Entraînement adapté" className="image-style" />
            <div className="text-overlay">
              <div className="form-oblic"></div>
              <h4>Nutrition personnalisée</h4>
              <p>Des régimes adaptés à vos besoins</p>
            </div>
          </div>
        </div>
      </div>

      <div className='circles'>
        <div className='cercle1'></div>
        <div className='cercle2'></div>
      </div>


     {/* Section Nos Programmes */}
     <div className='trait-bleu'></div>
<h2 className="text-center">Nos profils coachs</h2>
<div className="nos-programmes-container">
  {/* Card Musculation */}
  <div className="program-cards">
  <div className="program-title">Musculation</div>
    <img src={musculationImage} alt="Musculation" className="program-image" />
    
  </div>

  {/* Card Fitness */}
  <div className="program-cards">
  <div className="program-title">Fitness</div>
    <img src={fitnessImage} alt="Fitness" className="program-image" />
   
  </div>

  {/* Card Préparation Physique */}
  <div className="program-cards">
  <div className="program-title">Préparation Physique</div>
    <img src={preparationImage} alt="Préparation Physique" className="program-image" />
    
  </div>
</div>

<h2 className='text-devenir-coach'>Pourquoi rejoindre les coachs sportifs de la plateforme ?</h2>
<div className='section-devnir-coach'>
<div className='section-text-coach'>
  <h4>Devenir un coach sportif ?</h4>
   <p>Vous êtes un coach sportif professionnel,
     réactif, motivé à  rejoindre Alflux et à
    satisfaire nos clients ? Vous voulez 
    bénéficier d’un revenu supplémentaire! 
    N’hésitez pas à vous inscrire en cliquant  
    sur le bouton ci-dessous:</p>

     <button className='devenir-coaches-button'>Devenir Coach</button>
</div>
<div className='section-image-coach'></div>
</div>
<div className='trait-bleu'></div>

 {/* Testimonials Section */}
 <h2 className="text-center">Témoignage de nos clients</h2>
      <div className="testimonial-container">
        <div className="testimonial-card">
          <img src={profile1} alt="Client 1" className="testimonial-profile" />
          <h4>Yacine Ndiaye</h4>
          <p className="testimonial-text">"Alflux a transformé ma routine de fitness. Les programmes sont bien structurés et adaptés à tous les niveaux."</p>
        </div>
        <div className="testimonial-card">
          <img src={profile2} alt="Client 2" className="testimonial-profile" />
          <h4>Yacine Ndiaye</h4>
          <p className="testimonial-text">"Les coachs sont vraiment attentifs et m'ont aidé à atteindre mes objectifs. Je recommande à 100% !"</p>
        </div>
        <div className="testimonial-card">
          <img src={profile3} alt="Client 3" className="testimonial-profile" />
          <h4>Yacine Ndiaye</h4>
          <p className="testimonial-text">"Des entraînements accessibles, variés et très motivants. Parfait pour ceux qui veulent intégrer le sport dans leur quotidien."</p>
        </div>
      </div>

      {/* Pagination */}
      <div className="testimonial-pagination">
        <button className="pagination-dot"></button>
        <button className="pagination-dot"></button>
        <button className="pagination-dot"></button>
      </div>
      <h2 className="text-center">Comment ça marche ?</h2>
      <div className='section-comment-marche'>
      <div className="steps-container">
  <div className="step">
    <div className="circle">1</div>
    <p className="step-description">Créer un compte</p>
  </div>
  <div className="line"></div>
  <div className="step">
    <div className="circle">2</div>
    <p className="step-description">Choisir un programme</p>
  </div>
  <div className="line"></div>
  <div className="step">
    <div className="circle">3</div>
    <p className="step-description">Trouver un coach</p>
  </div>
  <div className="line"></div>
  <div className="step">
    <div className="circle">4</div>
    <p className="step-description">Commencer l'entraînement</p>
  </div>


</div>
<div className='contain-all-box'>
  <div className='card'> 
    <p>Répondez à quelques questions,
       puis sélectionnez votre coach en
        fonction  de son expérience, 
        de ses spécialités et de 
        sa personnalité.</p>

  </div>
  <div className='card'>
    <p>Participez à un appel vidéo pour
       faire connaissance avec votre coach, 
        lui faire part de vos objectifs et 
        lui fournir des informations sur 
        vous  et votre quotidien.</p>
  </div>
  <div className='card'>
    <p>Effectuez vos séances d’entraînement
       sur votre application Alflux. Votre 
        coach vous accompagnera et adaptera
         vos séances en fonction de votre  
         progression.</p>
  </div>
  <div className='card'>
    <p>Effectuez vos séances d’entraînement 
      sur votre application Alflux. Votre  
      coach vous accompagnera et adaptera
       vos séances en fonction de votre 
        progression.</p>
  </div>
</div>
      </div>
      {/* Add the new button to find a coach */}
      <div className='contain-button'>
        <button className='search-coach' onClick={() => navigate('/trouver-coach')}>
          Trouver votre coach
        </button>
      </div>
    
  
  
      <Footer />
</div>

    
  );
}

export default Home; 

