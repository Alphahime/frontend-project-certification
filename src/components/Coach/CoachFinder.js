import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CoachFinder.css';

const CoachFinder = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [step, setStep] = useState(1);
  const [objectives, setObjectives] = useState('');
  const [level, setLevel] = useState('');
  const [availability, setAvailability] = useState('');
  const [preferredSports, setPreferredSports] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to FilteredCoachList with the form data
    navigate('/filtered-coaches', {
      state: { objectives, level, availability, preferredSports }
    });
  };

  const handleCheckboxChange = (sport) => {
    setPreferredSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <form onSubmit={handleSubmit} className="coach-finder-form space">
      {/* Progress Indicator */}
      <div className="progress-indicator">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className={`progress-circle ${num <= step ? 'active' : ''}`}>
            {num}
          </div>
        ))}
      </div>

      {/* Step 1: Objectives */}
      {step === 1 && (
        <div className="question-step">
          <h3 className="step-title">Quels sont vos objectifs ?</h3>
          <div className="button-groups">
            {['Perte de poids', 'Gain de muscle', 'Maintien de forme'].map((objective) => (
              <button
                key={objective}
                type="button"
                className={`button-option ${objectives === objective ? 'active' : ''}`}
                onClick={() => setObjectives(objective)}
              >
                {objective}
              </button>
            ))}
          </div>
          <p className="step-description">Perte de poids, Gain de muscle, Maintien de forme</p>
        </div>
      )}

      {/* Step 2: Current Level */}
      {step === 2 && (
        <div className="question-step">
          <h3 className="step-title">Niveau actuel</h3>
          <div className="button-groups">
            {['Débutant', 'Intermédiaire', 'Avancé'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`button-option ${level === lvl ? 'active' : ''}`}
                onClick={() => setLevel(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>
          <p className="step-description">Débutant, Intermédiaire, Avancé</p>
        </div>
      )}

      {/* Step 3: Availability */}
      {step === 3 && (
        <div className="question-step">
          <h3 className="step-title">Vos horaires de disponibilités</h3>
          <input
            type="date"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="calendar-input"
          />
        </div>
      )}

      {/* Step 4: Preferred Sports */}
      {step === 4 && (
        <div className="question-step">
          <h3 className="step-title">Quels types de sports préférez-vous ?</h3>
          <div>
            {['Musculation', 'Yoga', 'Préparation physique'].map((sport) => (
              <label key={sport} className="block">
                <input
                  type="checkbox"
                  value={sport}
                  checked={preferredSports.includes(sport)}
                  onChange={() => handleCheckboxChange(sport)}
                />
                {sport}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        {step > 1 && <button type="button" className='boutton-arriere' onClick={prevStep}>Précédent</button>}
        {step < 4 ? (
          <button type="button" className='boutton-arriere' onClick={nextStep}>Suivant</button>
        ) : (
          <button type="submit" className="trouver-votre-coach">
            Trouver votre coach
          </button>
        )}
      </div>
    </form>
  );
};

export default CoachFinder;
