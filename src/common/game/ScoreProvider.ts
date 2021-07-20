import { IScoreProvider } from "./GameTypes";

export default function ScoreProvider(numberToCatch: number): IScoreProvider {
  let yetToCatch = numberToCatch;

  function extenderCatch(): void {
    yetToCatch = numberToCatch;
  }

  function successfullCatch(): void {
    yetToCatch -= 1;
  }

  return {
    get yetToCatch() { 
      return yetToCatch
    },
    extenderCatch,
    successfullCatch
  }
}