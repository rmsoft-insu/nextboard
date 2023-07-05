import { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import * as WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import randomColor from "randomcolor";
import ReactPlayer from "react-player";

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

  const createWave = (event: any) => {
    if (regions.length > 0) {
      waveRef.current.regions.clearRegions();
    }
    setLoading(false);
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const { result } = event.target;
        const blob = new window.Blob([
          new Uint8Array(result as ArrayBufferLike),
        ]);
        const url = URL.createObjectURL(blob);
        waveRef.current.load(url);
        //aveRef.current.loadBlob(blob);
        setVideo(url);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const updateWave = (event: any) => {
    console.log(event);
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
      <input type="file" onChange={createWave} />
      <ReactPlayer
        width={"100%"}
        url={video}
        ref={videoRef}
        muted={true}
        progressInterval={300}
        id={"videoplayer"}
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
