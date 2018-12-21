type Database = {
  [userName: string]: {
    id: number,
    name: string,
    role: string,
    password: string,
    active: boolean
  }
}

export const db: Database = {
  user: {
    id: 0,
    name: 'user',
    role: 'admin',
    password: '123',
    active: true
  }
};
