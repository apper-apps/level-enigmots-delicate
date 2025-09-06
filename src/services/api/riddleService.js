import riddlesData from "@/services/mockData/riddles.json"

// Simulate network delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const riddleService = {
  async getAll() {
    await delay(300)
    return [...riddlesData] // Return a copy to prevent mutations
  },

  async getById(Id) {
    await delay(200)
    const riddle = riddlesData.find(r => r.Id === parseInt(Id))
    if (!riddle) {
      throw new Error("Riddle not found")
    }
    return { ...riddle } // Return a copy to prevent mutations
  },

  async getByCategory(category) {
    await delay(250)
    return riddlesData
      .filter(r => r.category.toLowerCase() === category.toLowerCase())
      .map(r => ({ ...r })) // Return copies to prevent mutations
  },

  async getRandom(count = 1) {
    await delay(200)
    const shuffled = [...riddlesData].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count).map(r => ({ ...r }))
  },

  async create(riddle) {
    await delay(400)
    const newRiddle = {
      ...riddle,
      Id: Math.max(...riddlesData.map(r => r.Id)) + 1
    }
    riddlesData.push(newRiddle)
    return { ...newRiddle }
  },

  async update(Id, data) {
    await delay(350)
    const index = riddlesData.findIndex(r => r.Id === parseInt(Id))
    if (index === -1) {
      throw new Error("Riddle not found")
    }
    riddlesData[index] = { ...riddlesData[index], ...data }
    return { ...riddlesData[index] }
  },

  async delete(Id) {
    await delay(300)
    const index = riddlesData.findIndex(r => r.Id === parseInt(Id))
    if (index === -1) {
      throw new Error("Riddle not found")
    }
    const deleted = riddlesData.splice(index, 1)[0]
    return { ...deleted }
  }
}