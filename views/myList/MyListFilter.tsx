import {Stack} from 'components/_common';
import {ThemeProps} from 'components/_common/styles';
import styled from 'styled-components';
import {fontSize} from 'styles/units';

export type MyListFilterType = 'ALL' | 'TJ' | 'KY';

interface Props {
  selected: MyListFilterType;
  setSelected: (value: MyListFilterType) => void;
}

const filters: {label: string; value: MyListFilterType}[] = [
  {label: '전체', value: 'ALL'},
  {label: 'TJ', value: 'TJ'},
  {label: 'KY', value: 'KY'},
];

const MyListFilter = (props: Props) => {
  const {selected, setSelected} = props;

  return (
    <Stack spacing='4px' isHorizontal alignItems='center'>
      <FilterText>필터:</FilterText>
      {filters.map((item, index) => (
        <FilterToggle
          key={index}
          isSelected={selected === item.value}
          onClick={() => setSelected(item.value)}
        >
          {item.label}
        </FilterToggle>
      ))}
    </Stack>
  );
};

interface FilterToggleProps extends ThemeProps {
  isSelected?: boolean;
}

export const FilterText = styled.div`
  font-size: ${fontSize.md};
  font-weight: bold;
`;

export const FilterToggle = styled.span<FilterToggleProps>`
  font-size: ${fontSize.sm};
  font-weight: bold;
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.color.gray[0]};
  border-radius: 9999px;
  cursor: pointer;

  color: ${(props) =>
    props.isSelected ? props.theme.color.white : props.theme.color.gray[0]};
  background: ${(props) =>
    props.isSelected ? props.theme.color.gray[0] : props.theme.color.white};
`;

export default MyListFilter;
