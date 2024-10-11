import { IonContent, IonItem, IonHeader, IonLabel,  IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import useApi, { SearchType } from '../hooks/useApi'

const Home: React.FC = () => {

  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
      return;
    }

    const loadData = async() => {
      const result = await searchData(searchTerm, type)
      setResults(result)
      console.log('file: Home.tsx:31 ~ loadData ~ results', result);
    }
    loadData()
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar value={searchTerm} 
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)}></IonSearchbar>
        <IonItem>
          <IonLabel>Select Searchtype</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value! as SearchType)}>
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
