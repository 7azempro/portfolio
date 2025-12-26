
'use client';
import { useState, useEffect } from 'react';
import { PiClockLight, PiMapPinLight, PiCircleLight, PiSunLight, PiMoonLight, PiCloudFogLight, PiCloudRainLight, PiSnowflakeLight, PiLightningLight } from 'react-icons/pi';

export default function StatusHub({ lang }) {
    const [time, setTime] = useState('');
    const [isNight, setIsNight] = useState(false);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // Cairo Time Update
        const updateTime = () => {
            const now = new Date();

            // Safer Time Logic using Intl directly
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Africa/Cairo',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setTime(timeFormatter.format(now));

            // Safer Hour Logic
            const hourFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Africa/Cairo',
                hour: 'numeric',
                hour12: false
            });
            const hours = parseInt(hourFormatter.format(now), 10);
            setIsNight(hours < 6 || hours >= 18);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Weather Fetcher (OpenMeteo - Free, No Key)
        const fetchWeather = async () => {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&current_weather=true');
                const data = await res.json();
                setWeather(data.current_weather);
            } catch (error) {
                console.error('Weather forecast unavailable:', error);
            }
        };

        fetchWeather();
        // Refresh every 30 mins
        const interval = setInterval(fetchWeather, 1800000);
        return () => clearInterval(interval);
    }, []);

    // WMO Weather Code Mapper
    const getWeatherIcon = (code) => {
        if (code === undefined || code === null) return <PiSunLight className="w-4 h-4 text-orange-500" />; // Default if no code
        if (code <= 1) return <PiSunLight className="w-4 h-4 text-orange-500" />; // Clear
        if (code <= 3) return <PiCloudFogLight className="w-4 h-4 text-gray-400" />; // Cloudy
        if (code <= 67) return <PiCloudRainLight className="w-4 h-4 text-blue-400" />; // Rain
        if (code <= 77) return <PiSnowflakeLight className="w-4 h-4 text-cyan-300" />; // Snow
        return <PiLightningLight className="w-4 h-4 text-yellow-400" />; // Thunder/Other
    };

    return (
        <div className="grid grid-cols-2 gap-2 mb-6">
            {/* 1. LOCATION & TIME (The "Reality" Block) */}
            <div className="col-span-2 p-3 rounded-xl border border-dashed border-foreground/20 bg-foreground/5 flex items-center justify-between group hover:bg-foreground/10 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background border border-foreground/10 flex items-center justify-center text-foreground">
                        {isNight ? <PiMoonLight className="w-4 h-4" /> : <PiSunLight className="w-4 h-4" />}
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-0.5">
                            {lang === 'ar' ? 'القاهرة، مصر' : 'CAIRO, EG'}
                        </div>
                        <div className="text-xs font-bold font-mono text-foreground flex items-center gap-2">
                            {time} <span className="text-[9px] opacity-50 font-normal">GMT+2</span>
                        </div>
                    </div>
                </div>
                {/* Live Indicator */}
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </div>

            {/* 2. AVAILABILITY (The "Business" Block) */}
            <div className="p-3 rounded-xl border border-dashed border-foreground/20 bg-foreground/5 hover:bg-foreground/10 transition-colors flex flex-col justify-between h-20">
                <div className="flex justify-between items-start">
                    <PiCircleLight className="w-4 h-4 text-green-500 fill-green-500" />
                    <span className="text-[9px] font-mono opacity-50">STAT</span>
                </div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {lang === 'ar' ? 'متاح للعمل' : 'AVAILABLE'}
                    </div>
                    <div className="text-[9px] text-muted-foreground">
                        {lang === 'ar' ? 'مشاريع جديدة' : 'For New Projects'}
                    </div>
                </div>
            </div>

            {/* 3. WEATHER (The "Atmosphere" Block) - Replaces Redundant Location Block */}
            <div className="p-3 rounded-xl border border-dashed border-foreground/20 bg-foreground/5 hover:bg-foreground/10 transition-colors flex flex-col justify-between h-20">
                <div className="flex justify-between items-start">
                    {getWeatherIcon(weather?.weathercode)}
                    <span className="text-[9px] font-mono opacity-50">WTHR</span>
                </div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1">
                        {weather ? Math.round(weather.temperature) : '--'}°C
                    </div>
                    <div className="text-[9px] text-muted-foreground truncate">
                        {weather ? (lang === 'ar' ? 'الطقس الحالي' : 'DOWNTOWN') : 'Loading...'}
                    </div>
                </div>
            </div>
        </div>
    );
}

