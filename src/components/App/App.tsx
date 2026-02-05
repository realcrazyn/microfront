import { Link, Outlet } from 'react-router-dom'
import cls from './App.module.scss'
import CarPng from '@/assets/car.png'
import CarJpg from '@/assets/car2.jpg'
import CarSvg from '@/assets/car3.svg'

export const App = () => {


    // if (__PLATFORM__ === 'mobile') {
    //     return <div>IS MOBILE</div>
    // }

    function TODO(a: string) {
        TODO2(a)
    }
    function TODO2(a: string) {
        throw new Error('Some err')
    }


    return <div className={cls.app} data-testid={'App.DataTestId'}>
        <div data-testid={'AppBody.DataTestId'}>
            < img width={100} height={100} src={CarPng} />
            <img width={100} height={100} src={CarJpg} />
            <input />
            <CarSvg fill={'red'} color='green' width={100} height={100} />
            <button onClick={() => TODO('S')}>Click</button>
        </div>
        <h1>{__PLATFORM__}</h1>
        <div className={cls.navbar}>
            <Link to='/about'>About</Link>
            <Link to='/shop'>Shop</Link>
        </div>
        <div className={cls.outlet}>
            <Outlet />
        </div>
    </div>
}