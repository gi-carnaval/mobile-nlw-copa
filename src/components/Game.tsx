import { useState, useEffect } from 'react'
import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

import { Team } from './Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: Date;
  firstTeamCountryCode: string;
  firstTeamCountryName: string;
  secondTeamCountryCode: string;
  secondTeamCountryName: string;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: Props) {
  const { colors, sizes } = useTheme();
  const [ firstTeamPointsSaved, setFirstTeamPointsSaved ] = useState(0)
  const [ secondTeamPointsSaved, setSecondTeamPointsSaved ] = useState(0)

  useEffect(() => {
    if(data.guess != null){
      setFirstTeamPointsSaved(data.guess.firstTeamPoints)
      setSecondTeamPointsSaved(data.guess.secondTeamPoints)
    }
  }, [])

  

  const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY");

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {data.firstTeamCountryName} vs. {data.secondTeamCountryName}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          points={firstTeamPointsSaved}
        />

        <X color={colors.gray[300]} size={sizes[6]} />
        {/* {console.log(data.guess)} */}
        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          points={secondTeamPointsSaved}
        />
      </HStack>

      {
        !data.guess &&
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm}>
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }
    </VStack>
  );
}