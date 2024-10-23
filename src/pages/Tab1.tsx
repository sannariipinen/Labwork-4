import React, { useState } from 'react';
import Axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import './Tab1.css';

const APP_ID = "f2409080";
const APP_KEY = "fbb189bc890f963f2222e480543175f9";

interface RecipeProps {
  recipe: {
    label: string;
    image: string;
    ingredients: { text: string; weight: number }[];
    url: string;
  };
}

const RecipeComponent: React.FC<RecipeProps> = (props) => {
  const [show, setShow] = useState(false);
  const { label, image, ingredients, url } = props.recipe;

  return (
    <div className="recipe-container">
      <Dialog onClose={() => setShow(false)} open={show}>
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <span className="recipe-name">{label}</span>
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <div className="dialog-actions">
          <span className="button see-more" onClick={() => window.open(url)}>See More</span>
          <span className="button close-button" onClick={() => setShow(false)}>Close</span>
        </div>
      </Dialog>
      <img className="cover-image" src={image} alt={label} />
      <span className="recipe-name">{label}</span>
      <span className="ingredients-button button" onClick={() => setShow(true)}>Ingredients</span>
      <span className="see-more-button button" onClick={() => window.open(url)}>See Complete Recipe</span>
    </div>
  );
};

const Tab1: React.FC = () => {
  const [searchQuery, updateSearchQuery] = useState('');
  const [recipeList, updateRecipeList] = useState<any[]>([]);
  const [timeoutId, updateTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const fetchData = async (searchString: string) => {
    try {
      const response = await Axios.get(
        `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      console.log(response.data);
      updateRecipeList(response.data.hits);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="toolbar">
          <div className="header-content">
            <img className="recipe-image" src="/donut.svg" alt="Recipe" />
            <IonTitle>Recipe Finder</IonTitle>
            <div className="search-container">
              <div className="search-box">
                <img className="search-icon" src="/search.svg" alt="Search" />
                <input
                  className="search-input"
                  placeholder="Search Recipe"
                  value={searchQuery}
                  onChange={onTextChange}
                />
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="recipe-list-container">
          {recipeList.length ? (
            recipeList.map((recipe, index) => (
              <RecipeComponent key={index} recipe={recipe.recipe} />
            ))
          ) : (
            <img className="placeholder" src="/donut.svg" alt="Placeholder" />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;