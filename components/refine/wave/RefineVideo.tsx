import { useRef, useState, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import * as WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import randomColor from "randomcolor";
import ReactPlayer from "react-player";
import { useForm } from "react-hook-form";

const URL = `https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/video/m2.mp4`;

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
  const [list, setList] = useState([]);

  const [video, setVideo] = useState("");

  const { register, handleSubmit, watch, setValue } = useForm();

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
      dummy.forEach((region) => {
        const { start, end, color } = region;
        waveRef.current.addRegion({
          start,
          end,
          color,
        });
      });

      setLoading(true);
    });
    waveRef.current.on("region-created", (event: any) => createOption(event));
    waveRef.current.on("region-update-end", (event: any) => updateWave(event));
    waveRef.current.enableDragSelection({});
  }, []);

  const formatList = useCallback(() => {
    return regions.map((el, index) => ({
      start: el.start,
      end: el.end,
      color: el.color,
      id: el.id,
      title: el.element.title,
      contents: dummy?.[index]?.contents ?? "",
      speaker: dummy?.[index]?.contents ?? "",
      gender: dummy?.[index]?.gender ?? "",
    }));
  }, [regions]);

  useEffect(() => {
    const sortedList = formatList().sort((previous, current) => {
      if (previous.start > current.start) return 1;
      if (previous.start < current.start) return -1;
    });
    sortedList.length !== 0 && setList(() => sortedList);
  }, [formatList]);

  return (
    <div>
      <ReactPlayer
        width={"100%"}
        url={URL}
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
      <button onClick={handleSubmit((data) => console.log(data))}>제출</button>
      {list.map((region) => (
        <div key={region.id}>
          <span
            onClick={() => onPlayRegion(region.id)}
            style={{ backgroundColor: `${region.id}` }}
          >
            {region.title}
          </span>
          {region.contents}

          <input
            type="text"
            defaultValue={region.contents}
            {...register(`${region.id}_contents`)}
          />

          <input
            type="text"
            defaultValue={region.gender}
            {...register(`${region.id})_gender`)}
          />

          <span onClick={() => onDeleteRegion(region.id)}>X</span>
        </div>
      ))}
    </div>
  );
};

export default RefineVideo;

const dummy = [
  {
    start: 9.699275616042241,
    end: 22.147185069357135,
    id: "wavesurfer_di7rv2l4il",
    color: "rgba(167, 169, 242, 0.3)",
    contents: "안녕하세요 1",
    speaker: "",
    location: "",
    gender: "",
    ageGroup: "",
    timeslot: "",
    correction: false,
  },
  {
    start: 174.2611886209896,
    end: 199.3080051441226,
    id: "wavesurfer_vokpnt1rk3g",
    color: "rgba(255, 227, 135, 0.3)",
    contents: "안녕하세요 2",
    speaker: "",
    location: "",
    gender: "",
    ageGroup: "",
    timeslot: "",
    correction: false,
  },
  {
    start: 248.1295708675843,
    end: 266.2272706308062,
    id: "wavesurfer_ismkrr2pkg8",
    color: "rgba(117, 234, 203, 0.3)",
    contents: "안녕하세요 3",
    speaker: "",
    location: "",
    gender: "MALE",
    ageGroup: "",
    timeslot: "",
    correction: false,
  },
  {
    start: 274.4595494947695,
    end: 297.3566392504479,
    id: "wavesurfer_2608ldto03",
    color: "rgba(178, 255, 195, 0.3)",
    contents: "안녕하세요 4",
    speaker: "",
    location: "",
    gender: "FEMALE",
    ageGroup: "",
    timeslot: "",
    correction: false,
  },
  {
    start: 332.63550487869435,
    end: 353.33287422116354,
    id: "wavesurfer_1ue0q58o7i",
    color: "rgba(252, 250, 159, 0.3)",
    contents: "안녕하세요 5",
    speaker: "",
    location: "",
    gender: "",
    ageGroup: "",
    timeslot: "",
    correction: false,
  },
  {
    start: 400.32690123063463,
    end: 426.82353348065567,
    id: "wavesurfer_5ae54u3ve5",
    color: "rgba(167, 255, 140, 0.3)",
    contents: "안녕하세요 6",
    speaker: "",
    location: "",
    gender: "",
    ageGroup: "",
    timeslot: "",
    correction: false,
  },
  {
    start: 428.8288205987298,
    end: 447.276475882235,
    id: "wavesurfer_9h1njj78jho",
    color: "rgba(167, 255, 140, 0.3)",
    contents: "안녕하세요 7",
    speaker: "",
    location: "",
    gender: "",
    ageGroup: "",
    timeslot: "",
    correction: false,
  },
];
