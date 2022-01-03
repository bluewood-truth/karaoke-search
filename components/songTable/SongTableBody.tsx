import {Divider} from 'components/divider';
import {Box} from 'components/_common';
import useMyList from 'hooks/pages/useMyList';
import React from 'react';
import type {Song} from 'types';
import SongTableItem from './SongTableItem';

interface Props {
  songList: Song[];
  isMobile?: boolean;
}

const SongTableBody = (props: Props) => {
  const {songList, isMobile} = props;
  const {toggleSong, isSongInMyList} = useMyList();

  return (
    <Box>
      {songList.map((item, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <Divider />}
          <SongTableItem
            song={item}
            inMyList={isSongInMyList(item.id)}
            onClickSong={toggleSong}
            isMobile={isMobile}
          />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default SongTableBody;
