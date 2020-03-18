import { INode, ILink } from './chart'

export interface IFacts {
  [id: string]: IFact
}

export interface IFact {
  chainA: IPathChain
  chainB: IPathChain
}

type IPathChain = [ILink]
