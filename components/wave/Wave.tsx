import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import * as WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import randomColor from "randomcolor";
import { useForm } from "react-hook-form";

const Wave = () => {
  const [zoomLevel, setZoomLevel] = useState(3);
  const [waveformLoaded, setWaveFormLoaded] = useState(false);
  const [regions, setRegions] = useState([]);
  const wavesurfer = useRef(null);
  const audioData = useRef(null);
  const { register, handleSubmit } = useForm();

  const [regionId, setRegionId] = useState("");

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#D9DCFF",
      progressColor: "#4353FF",
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 200,
      barGap: 3,
      plugins: [
        WaveSurferRegionsPlugin.create({ maxLength: 60 }),
        WaveSurferTimelinePlugin.create({ container: "#waveform-timeline" }),
      ],
    });
    wavesurfer.current.on("ready", () => {
      setWaveFormLoaded(true);
    });
    wavesurfer.current.on("region-created", (event) => {
      event.color = `${randomColor({
        luminosity: "light",
        alpha: 0.3,
        format: "rgba",
      })}`;
      event.maxLength = 60;
      //event.minLength = 5;
      setRegions((oldResions) => [...oldResions, event]);
    });
    wavesurfer.current.on("region-click", (event) => {
      setRegionId(event.id);
    });

    wavesurfer.current.enableDragSelection({});
  }, []);

  const createWaveform = (event) => {
    if (regions.length > 0) {
      wavesurfer.current.regions.clearRegions();
    }

    setWaveFormLoaded(false);
    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const { result } = event.target;
        audioData.current = event.target.result;
        let blob = new window.Blob([new Uint8Array(result as ArrayBuffer)], {
          type: "audio/mp3",
        });

        wavesurfer.current.loadBlob(blob);
        wavesurfer.current.zoom(zoomLevel);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const playPause = () => {
    if (!wavesurfer.current.isPlaying()) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };

  const playRegion = (id) => {
    wavesurfer.current.regions.list[id].play();
  };

  const zoomIn = (event) => {
    wavesurfer.current.zoom(event.target.value);
    setZoomLevel(event.target.value);
  };

  const deleteSegmanet = (id) => {
    wavesurfer.current.regions.list[id].remove();
    let updatedRegions = regions.filter((region) => {
      return region.id !== id;
    });
    setRegions(updatedRegions);
  };

  const handleStart = () => {
    console.log(regionId);
    console.log(wavesurfer.current.Region);
    console.log(wavesurfer.current.regions.list);
    console.log("list", wavesurfer.current.regions.list.regionId);
    console.log(wavesurfer.current.regions.list[`${regionId}`]);
    //console.log(wavesurfer.current.Region({ id: regionId }));
  };

  const addStart = () => {
    const { start, end } = wavesurfer.current.regions.list[`${regionId}`];
    console.log("start, end", start, end);
    wavesurfer.current.regions.list[`${regionId}`].update({
      start: start + 2,
      end: end,
    });
  };

  const addEnd = () => {
    const region = wavesurfer.current.regions.list[`${regionId}`];
    const { start, end } = region;
    region.update({
      start: start,
      end: end + 2,
    });
  };

  const clearRegions = () => {
    wavesurfer.current.regions.wavesurfer.clearRegions();
    setRegions([]);
    //wavesurfer.current.regions.clearRegions();
  };

  useEffect(() => {
    console.log(regions);
  }, [regions]);

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={createWaveform} />
      <div
        id="waveform"
        style={{ visibility: `${waveformLoaded ? "visible" : "hidden"}` }}
      ></div>
      {!waveformLoaded && <div>Loading...</div>}
      <div
        id="waveform-timeline"
        style={{ visibility: `${waveformLoaded ? "visible" : "hidden"}` }}
      ></div>
      <input
        type="range"
        id="zoom"
        onChange={zoomIn}
        min="1"
        max="10"
        value={zoomLevel}
      />
      <button onClick={playPause}>Play/Pause</button>
      <button
        onClick={handleSubmit((data) => {
          console.log(data);
        })}
      >
        Upload Audio
      </button>
      <button onClick={handleStart}>mmm</button>
      <button onClick={addStart}>add</button>
      <button onClick={addEnd}>end</button>
      <button onClick={clearRegions}>clear</button>
      {regions.map((region, index) => (
        <div key={region.id}>
          <span
            onClick={() => playRegion(region.id)}
            style={{ backgroundColor: `${region.id}` }}
          >
            {region.element.title}
          </span>
          <input type="text" {...register(`audio_${index}`)} />
          <span onClick={() => deleteSegmanet(region.id)}>X</span>
        </div>
      ))}
    </div>
  );
};

export default Wave;
