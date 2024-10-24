import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="toolbar">
          <IonTitle>Shopping List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="shopping-list-content">
        <div className="input-container">
          <IonInput
            value={inputValue}
            className="add-item"
            placeholder="Add item"
            onIonChange={(e) => setInputValue(e.detail.value!)}
          />
        </div>
        <IonButton onClick={addItem} color="dark" className="add-button">
          Add Item
        </IonButton>
        <IonList>
          {items.map((item, index) => (
            <IonItem key={index} className="added-item">
              <IonLabel>{item}</IonLabel>
              <IonButton
                slot="end"
                onClick={() => removeItem(index)}
                color="dark" 
                className="remove-button"
              >
                Remove
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
