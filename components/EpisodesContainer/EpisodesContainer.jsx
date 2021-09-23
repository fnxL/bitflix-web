import { useState } from 'react';
import { useQuery } from 'react-query';
import fetcher from '../../query/fetcher';
import requests from '../../query/requests';
import Dropdown from '../Dropdown/Dropdown';
import SkeletonElement from '../SkeletonElement/SkeletonElement';
import EpisodePoster from './EpisodePoster';

function EpisodesContainer({ seasons, id, title, imdb }) {
  const options = seasons
    .filter((season) => season.season_number !== 0)
    .map(({ episode_count, id, name, season_number }) => ({
      episode_count,
      id,
      name,
      season_number,
    }));

  const [selected, setSelected] = useState(options[0]);

  const url = `/tv/${id}/season/${selected.season_number}${requests.apiKey}`;

  const { data, isLoading } = useQuery([Number(id), url], () => fetcher(url));
  let episodes;
  if (data) episodes = data.episodes;

  return (
    <div className="px-[4%] mt-10 py-[1em] pb-0">
      <div className="header flex justify-between">
        <div className="font-bold text-[24px] mt-[48px] mb-[20px]">Episodes</div>
        <Dropdown options={options} selected={selected} setSelected={setSelected} />
      </div>
      <div className="episodes_container flex flex-wrap justify-start flex-col">
        {isLoading &&
          [...Array(selected.episode_count)].map((_, i) => (
            <div key={i} className="skeleton pl-[7.5%] flex items-center">
              <SkeletonElement type="poster" style={{ marginBottom: 0, width: '23.5%' }} />
              <div className="pl-[10px] texts flex flex-col w-full ">
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
              </div>
            </div>
          ))}

        {episodes &&
          episodes.map((episode) => (
            <EpisodePoster
              key={episode.id}
              data={episode}
              season={selected.season_number}
              title={title}
              imdb={imdb}
            />
          ))}
      </div>
    </div>
  );
}

export default EpisodesContainer;
