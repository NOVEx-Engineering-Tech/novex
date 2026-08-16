export interface PersonSocials {
  facebook?: string
  instagram?: string
  github?: string
}

export interface Person {
  name: string
  githubLink?: string
  occupation?: string
  role?: string
  position?: string
  experts?: string[]
  socials?: PersonSocials
}

export interface PersonCardProps {
  person: Person
  variant?: 'member' | 'founder'
}
