import { useRef, useState, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import * as WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import randomColor from "randomcolor";
import ReactPlayer from "react-player";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const URL = `https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/contents/%ED%95%9C%EA%B8%80+%EA%B3%B5%EB%B0%B1+%ED%85%8C%EC%8A%A4%ED%8A%B8/000000_%ED%95%9C%EA%B8%80+%EA%B3%B5%EB%B0%B1+%ED%85%8C%EC%8A%A4%ED%8A%B8.mp4`;
const SUB = `https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/contents/%ED%95%9C%EA%B8%80+%EA%B3%B5%EB%B0%B1+%ED%85%8C%EC%8A%A4%ED%8A%B8/000000_%ED%95%9C%EA%B8%80+%EA%B3%B5%EB%B0%B1+%ED%85%8C%EC%8A%A4%ED%8A%B8.vtt`;

`https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/video/m2.mp4`;

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

  const [captions_arr, setCaptions] = useState([]);

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
        const { start, end } = region;
        waveRef.current.addRegion({
          start,
          end,
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
      id: el.id,
      rejectYn: dummy?.[index]?.rejectYn ?? "",
      timeline: el.element.title,
      seek: dummy?.[index]?.seek ?? null,
      meta: {
        speakerIdx: dummy?.[index]?.meta?.speakerIdx ?? null,
        speaker: dummy?.[index]?.meta?.speaker ?? "",
        place: dummy?.[index]?.meta?.place ?? "",
        gender: dummy?.[index]?.meta?.gender ?? "",
        day: dummy?.[index]?.meta?.day ?? "",
        ageGroup: dummy?.[index]?.meta?.ageGroup ?? "",
        wordTags: dummy?.[index]?.meta?.wordTags ?? [],
      },
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
    <Container>
      <div>
        <button onClick={() => console.log(list)}>제출</button>
        <ReactPlayer
          width={"100%"}
          url={URL}
          ref={videoRef}
          muted={true}
          progressInterval={300}
          id={"videoplayer"}
          controls={true}
          config={{
            file: {
              attributes: {
                crossOrigin: "true",
              },
              tracks: [
                {
                  kind: "subtitles",
                  src: SUB,
                  srcLang: "ko",
                  default: true,
                  label: "eng",
                },
              ],
            },
          }}
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
      </div>
      <div>오른쪽</div>
    </Container>
  );
};

export default RefineVideo;

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const dummy = [
  {
    start: 9.699275616042241,
    end: 22.147185069357135,
    seek: 0,
    id: "",
    text: "안녕하세요 1",
    rejectYn: "NO",
    timeline: "",
    meta: {
      speakerIdx: 1,
      gender: "MALE",
      day: "MORNING",
      place: "OUTDOOR",
      speaker: "speaker1",
      ageGroup: "PRE_TEENS",
      wordTags: [
        { type: "NEOLOGISM", word: "Hi", languageType: "KOREAN" },
        { type: "ABBERVIATION", word: "Hello", languageType: "KOREAN" },
      ],
    },
  },
  {
    start: 174.2611886209896,
    end: 199.3080051441226,
    id: "",
    seek: 0,
    text: "안녕하세요 2",
    rejectYn: "YES",
    timeline: "",
    meta: {
      speakerIdx: 2,
      gender: "FEMALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "speaker2",
      ageGroup: "TEENAGER_TO_THIRTIES",
      wordTags: [],
    },
  },
  {
    start: 248.1295708675843,
    end: 266.2272706308062,
    id: "",
    seek: 0,
    text: "안녕하세요 3",
    rejectYn: "NO",
    timeline: "",
    meta: {
      speakerIdx: 3,
      gender: "MALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "speaker3",
      ageGroup: "THIRTIES_TO_FIFITES",
      wordTags: [],
    },
  },
  {
    start: 274.4595494947695,
    end: 297.3566392504479,
    id: "",
    seek: 0,
    text: "안녕하세요 4",
    rejectYn: "NO",
    timeline: "",
    meta: {
      speakerIdx: 4,
      gender: "FEMALE",
      day: "MORNING",
      place: "OUTDOOR",
      speaker: "speaker4",
      ageGroup: "SIXTIES_AND_ABOVE",
      wordTags: [],
    },
  },
  {
    start: 332.63550487869435,
    end: 353.33287422116354,
    id: "",
    seek: 0,
    text: "안녕하세요 5",
    rejectYn: "NO",
    timeline: "",
    meta: {
      speakerIdx: 5,
      gender: "MALE",
      day: "AFTERNOON",
      place: "INDOOR",
      speaker: "speaker5",
      ageGroup: "TEENAGER_TO_THIRTIES",
      wordTags: [],
    },
  },
  {
    start: 400.32690123063463,
    end: 426.82353348065567,
    id: "",
    text: "안녕하세요 6",
    seek: 0,
    rejectYn: "YES",
    timeline: "",
    meta: {
      speakerIdx: 6,
      gender: "FEMALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "",
      ageGroup: "THIRTIES_TO_FIFITES",
      wordTags: [],
    },
  },
  {
    start: 428.8288205987298,
    end: 447.276475882235,
    id: "",
    text: "안녕하세요 7",
    seek: 0,
    rejectYn: "YES",
    timeline: "",
    meta: {
      speakerIdx: 7,
      gender: "FEMALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "",
      ageGroup: "THIRTIES_TO_FIFITES",
      wordTags: [],
    },
  },
];
