export interface Monster {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export const MONSTERS: Monster[] = [
  {
    id: 'slime_knight',
    name: 'スライムナイト',
    imageUrl: '/monsters/slime_knight.png',
    description: '小さな騎士の兜をかぶった、勇敢なスライム。'
  },
  {
    id: 'fire_drake',
    name: 'ベビーフレイム',
    imageUrl: '/monsters/fire_drake.png',
    description: 'まだ小さな火の竜。くしゃみをすると火花が飛ぶ。'
  },
  {
    id: 'shadow_spirit',
    name: 'シャドウゴースト',
    imageUrl: '/monsters/shadow_spirit.png',
    description: '影から生まれた不思議な精霊。いたずらが大好き。'
  },
  {
    id: 'forest_fox',
    name: 'リーフフォックス',
    imageUrl: '/monsters/forest_fox.png',
    description: '森の守り神とされる狐。背中から葉っぱが生えている。'
  }
];

export const getRandomMonster = (): Monster => {
  const randomIndex = Math.floor(Math.random() * MONSTERS.length);
  return MONSTERS[randomIndex];
};
