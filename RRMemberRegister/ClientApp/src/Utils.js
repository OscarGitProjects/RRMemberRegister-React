class Utils 
{

    static createRange = (min, max) =>
    {
        return Array.from({length: max - min + 1}, (_, i) => min + i);
    }

    static sumArray = (arr) => 
    {
        return arr.reduce((acc, curr) => acc + curr, 0)
    }

    static createRandomNumber = (min, max) =>
    {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    static randomSumIn = (arr, max) =>
    {
        const sets = [[]];
        const sums = [];

        for (let i = 0; i < arr.length; i++) 
        {
          for (let j = 0, len = sets.length; j < len; j++) 
          {
            const candidateSet = sets[j].concat(arr[i]);
            const candidateSum = this.sumArray(candidateSet);
            if (candidateSum <= max) 
            {
              sets.push(candidateSet);
              sums.push(candidateSum);
            }
          }
        }
        
        return sums[this.createRandomNumber(0, sums.length - 1)];        
    }
}

export {Utils};