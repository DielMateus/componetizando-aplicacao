import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App(){
  const [selectedGenreId, setSelectedGenreId] = useState(1);/* está como 1 pois na descrição o estado 1 é 'action' */
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);/*Listagem dos gêneros, ou seja, listagem da Sidebar */

  useEffect(() =>{
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number){
    setSelectedGenreId(id);/*quando não tem return é void */
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* O estado compartilhado ou seja comum e que deve ser passado tanto para Sidebar.tsx quanto para Content.tsx deve ser o selectedGenreId */}
      <SideBar selectedGenreId={selectedGenreId} handleClickButton={handleClickButton} />
      <Content selectedGenre={selectedGenre} selectedGenreId={selectedGenreId} />
    </div>
  )

}
