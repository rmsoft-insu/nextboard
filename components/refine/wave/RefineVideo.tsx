import { useRef, useState, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import * as WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import randomColor from "randomcolor";
import ReactPlayer from "react-player";

const URL = `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;

const wavesurferOptions = {
  container: "#waveform",
  waveColor: "#9c9c9c",
  autoCenter: true,
  scrollParent: true,
  progressColor: "purple",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  height: 150,
  partialRender: true,
  media: "#videoplayer",
  /*    responsive: true,
  normalize: true, */
  plugins: [
    WaveSurferRegionsPlugin.create({ maxLength: 60 }),
    WaveSurferTimelinePlugin.create({ container: "#waveform-timeline" }),
  ],
};

const RefineVideo = () => {
  const waveRef = useRef(null);
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);

  const [video, setVideo] = useState("");

  //React Player
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const createOption = (event: any) => {
    event.maxLength = 60;
    event.minLength = 5;
    event.color = `${randomColor({
      luminosity: "light",
      alpha: 0.3,
      format: "rgba",
    })}`;
    setRegions((oldRegions) => [...oldRegions, event]);
  };

  const updateWave = (event: any) => {
    waveRef.current.on("destroy", event);
    const regionList = Object.values(waveRef.current.regions.list);
    setRegions(regionList);
  };

  const onPlayPause = () => {
    if (!waveRef.current.isPlaying()) {
      waveRef.current.play();
    } else {
      waveRef.current.pause();
    }
  };

  const onPlayRegion = (id) => {
    waveRef.current.regions.list[id].play();
  };

  const onDeleteRegion = (id) => {
    waveRef.current.regions.list[id].remove();
    let updatedRegions = regions.filter((region) => region.id !== id);
    setRegions(updatedRegions);
  };

  useEffect(() => {
    waveRef.current = WaveSurfer.create(wavesurferOptions as any);
    waveRef.current.load(URL);
    waveRef.current.on("ready", () => {
      waveRef.current.addRegion({
        start: 4,
        end: 8,
        color: randomColor(),
      });
      setLoading(true);
    });
    waveRef.current.on("region-created", (event: any) => createOption(event));
    waveRef.current.on("region-update-end", (event: any) => updateWave(event));
    waveRef.current.enableDragSelection({});
  }, []);

  return (
    <div>
      <ReactPlayer
        width={"100%"}
        url={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`}
        ref={videoRef}
        muted={true}
        progressInterval={300}
        id={"videoplayer"}
        controls={true}
      />

      <div
        id="waveform"
        style={{ visibility: `${loading ? "visible" : "hidden"}` }}
      />
      <div
        id="waveform-timeline"
        style={{ visibility: `${loading ? "visible" : "hidden"}` }}
      />
      <button onClick={onPlayPause}>Play/Pause</button>
      {regions.map((region, index) => (
        <div key={region.id}>
          <span
            onClick={() => onPlayRegion(region.id)}
            style={{ backgroundColor: `${region.id}` }}
          >
            {region.element.title}
          </span>
          <input type="text" />
          <span onClick={() => onDeleteRegion(region.id)}>X</span>
        </div>
      ))}
    </div>
  );
};

export default RefineVideo;
