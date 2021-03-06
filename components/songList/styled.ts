import styled, {css} from 'styled-components';
import {fadeIn} from 'styles/animation';
import {largeText, smallText} from 'styles/typography';

const SONG_COUNT_PER_FETCH = 15;

export const SongList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ListItem = styled.li`
  animation: ${fadeIn} 500ms backwards;

  ${Array(SONG_COUNT_PER_FETCH)
    .fill(null)
    .map(
      (_, i) => css`
        &: nth-of-type(${i + 1}) {
          animation-delay: ${i * 40}ms;
        }
      `
    )};
`;

export const SongItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
  padding: 0.5rem 1.5rem;
  color: var(--color-list-item-content);
  background-color: var(--color-list-item-bg);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px var(--color-shadow-weak);
  transition: transform 200ms;
  transform-origin: center right;
  will-change: transform;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }

  @media screen and (max-width: 767px) {
    & {
      column-gap: 1rem;
      padding: 0.25rem 0.75rem;
    }
  }
`;

export const SongNumber = styled.div`
  ${largeText};
  width: 4rem;
  text-align: center;

  @media screen and (max-width: 767px) {
    & {
      font-size: var(--font-size-md);
    }
  }
`;

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const SongTitle = styled.div`
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
`;

export const Singer = styled.div`
  ${smallText};
  color: var(--color-list-item-content-sub);
`;

export const Buttons = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

export const MyListButtonWrapper = styled.div`
  color: var(--color-bookmark-empty);
  transition: color 200ms;

  &[data-in-my-list='true'] {
    color: var(--color-bookmark);
  }
`;

export const ListItemLoadingWrapper = styled.li`
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
