import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import styles from '../styles/map.module.css'
import { Wrapper, Status } from "@googlemaps/react-wrapper"

const Home: NextPage = () => {
    const router = useRouter()

    const [events, setEvents] = useState([])
    const [filterTab, setFilterTab] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [host, setHost] = useState('')

    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(4);
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 33.775867,
        lng: -84.396317,
    });

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    interface MapProps extends google.maps.MapOptions {
        style: { [key: string]: string };
        onClick?: (e: google.maps.MapMouseEvent) => void;
        onIdle?: (map: google.maps.Map) => void;
        children?: React.ReactNode;
    }
    
    const Map: React.FC<MapProps> = ({
        onClick,
        onIdle,
        children,
        style,
        ...options
    }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const [map, setMap] = React.useState<google.maps.Map>();

        React.useEffect(() => {
            if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
            }
        }, [ref, map]);

        return (
            <>
              <div ref={ref} style={style} />
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  // set the map prop on the child component
                  // @ts-ignore
                  return React.cloneElement(child, { map });
                }
              })}
            </>
        );
    }
  
    return (
    <div>
      <Head>
        <title>Campus Discovery</title>
        <meta name="description" content="CS 2340 Group 7" />
        <link rel="icon" href="/gtLogo.png" />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto Slab' />
      </Head>

      <main>
        <NavBar />
        <div className='container'>
            {/* <iframe
                width="100%"
                height="100%"
                style={{border: "0", zIndex: "-999"}}
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBS0al4nwlBsz5w4RflXdYf5imYuXozR2g
                    &q=Georgia+Tech,Atlanta+GA">
            </iframe> */}
            
            <Wrapper apiKey={"AIzaSyBS0al4nwlBsz5w4RflXdYf5imYuXozR2g"} render={render}>
                <Map
                center={center}
                zoom={4}
                style={{ flexGrow: "1", height: "100%" }}>

                </Map>
            </Wrapper>

            <div className={styles.filter}>
                <button className={styles.filterButton} onClick={() => {setFilterTab(!filterTab)}}>Filter</button>
                {filterTab && <div className={styles.filterList}>
                    <p className={styles.filterTitle}>Date</p>
                    <div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>Start Date: </p>
                            <input className={styles.input} id="startDate" type="date" required={true} onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Date: </p>
                            <input className={styles.input} id="endDate" type="date" required={true} onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Time</p>
                    <div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>Start Time: </p>
                            <input className={styles.input} id="startTime" type="time" required={true} onChange={e => setStartTime(e.target.value)} />
                        </div>
                        <div className={styles.filterDiv}>
                            <p className={styles.filterText}>End Time: </p>
                            <input className={styles.input} id="endTime" type="time" required={true} onChange={e => setEndTime(e.target.value)} />
                        </div>
                    </div>

                    <p className={styles.filterTitle}>Location</p>

                    <p className={styles.filterTitle}>Host</p>
                    <div className={styles.filterDiv}>
                        <p className={styles.filterText}>Username: </p>
                        <input className={styles.input} required={true} onChange={e => setHost(e.target.value)} />
                    </div>
                </div>}
            </div>
        </div>
      </main>
    </div>
    )
}

export default Home
