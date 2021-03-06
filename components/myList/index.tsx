import {useEffect, useMemo, useState} from 'react';
import {SongList} from 'components/songList';
import {useMyList} from 'contexts/MyListContext';
import {
  MyListFilter,
  MyListKaraoke,
  MyListSong,
  MyListSortBy,
} from 'types';
import {Filter} from './filter';
import * as Styled from './styled';
import {usePagination} from 'hooks/usePagenation';
import {PageNav} from 'components/pageNav';
import {PageButton} from './pageButton';
import {NoMyList} from 'components/noResult';

interface Props {
  filter: MyListFilter;
}

const karaokeList: {label: string; value: MyListKaraoke}[] = [
  {label: 'ALL', value: 'ALL'},
  {label: 'TJ', value: 'TJ'},
  {label: 'KY', value: 'KY'},
];

const sortByList: {label: string; value: MyListSortBy}[] = [
  {label: '추가일자', value: 'ADDED_AT'},
  {label: '곡 제목', value: 'TITLE'},
  {label: '곡 번호', value: 'NUMBER'},
  {label: '가수', value: 'SINGER'},
];

export const MyList = ({filter}: Props) => {
  const {myList} = useMyList();
  const [songList, setSongList] = useState<MyListSong[]>([]);
  const {filteredSongList} = useFiltering(filter, songList);
  const {paginatedData, setPage, currPage, lastPage} = usePagination(
    filteredSongList,
    {
      withRouting: true,
      initialPage: filter.page,
    }
  );

  useEffect(() => {
    if (songList.length > 0) return;
    setSongList(Object.values(myList));
  }, [myList, songList.length]);

  if (filteredSongList.length === 0) {
    return (
      <Styled.MyList>
        <Filter
          filter={filter}
          sortByList={sortByList}
          karaokeList={karaokeList}
        />
        <NoMyList />
      </Styled.MyList>
    );
  }

  return (
    <Styled.MyList>
      <Filter
        filter={filter}
        sortByList={sortByList}
        karaokeList={karaokeList}
      />
      <SongList songList={paginatedData} />
      <PageNav
        currPage={currPage}
        lastPage={lastPage}
        setPage={setPage}
        pageNavComponent={Styled.PageNav}
        pageButtonComponent={PageButton}
      />
    </Styled.MyList>
  );
};

const useFiltering = (filter: MyListFilter, songList: MyListSong[]) => {
  const filteredSongList = useMemo(() => {
    const sorted = songList
      .filter((song) => {
        return filter.karaoke === 'ALL' || song.karaoke === filter.karaoke;
      })
      .sort((a, b) => {
        let compareValue = 0;
        switch (filter.sortBy) {
          case 'TITLE': {
            compareValue = a.title.localeCompare(b.title);
            break;
          }
          case 'SINGER': {
            compareValue = a.singer.localeCompare(b.singer);
            break;
          }
          case 'NUMBER': {
            compareValue = a.number.localeCompare(b.number);
            break;
          }
          case 'ADDED_AT': {
            compareValue = a.createdAt - b.createdAt;
            break;
          }
        }

        if (filter.sorting === 'DESC') {
          compareValue *= -1;
        }

        return compareValue;
      });

    return sorted;
  }, [filter.karaoke, filter.sortBy, filter.sorting, songList]);

  return {filteredSongList};
};
