import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize(
    process.env.POSTGRES_URI ?? '', {
        define: {
            timestamps: false
        }
    }
)