<template>
    <div class="error-wrap" @mousemove="mouseMove">
        <svg xmlns="http://www.w3.org/2000/svg" id="robot-error" viewBox="0 0 260 118.9" role="img">
            <title xml:lang="en">403 Error</title>

            <defs>
                <clipPath id="white-clip">
                    <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20"/>
                </clipPath>
                <text id="text-s" class="error-text" y="106"> 403</text>
            </defs>
            <path class="alarm" fill="#e62326" d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"/>
            <use xlink:href="#text-s" x="-0.5px" y="-1px" fill="black"></use>
            <use xlink:href="#text-s" fill="#2b2b2b"></use>
            <g id="robot">
                <g id="eye-wrap">
                    <use xlink:href="#white-eye"></use>
                    <circle id="eyef" class="eye" clip-path="url(#white-clip)" fill="#000" stroke="#2aa7cc"
                            stroke-width="2" stroke-miterlimit="10" cx="130" cy="65" r="11"/>
                    <ellipse id="white-eye" fill="#2b2b2b" cx="130" cy="40" rx="18" ry="12"/>
                </g>
                <circle class="lightblue" cx="105" cy="32" r="2.5" id="tornillo"/>
                <use xlink:href="#tornillo" x="50"></use>
                <use xlink:href="#tornillo" x="50" y="60"></use>
                <use xlink:href="#tornillo" y="60"></use>
            </g>
        </svg>
        <h1 class="message">Bạn không có quyền truy cập vào chức năng này.</h1>
    </div>
</template>

<script>
export default {
    name: "Error_403",
    data() {
        return {
            mouse_x: 0.5,
            mouse_y: 0.5,
        }
    },

    methods: {
        mouseMove(evt) {
            let eyef = document.getElementById('eyef');
            let cx = document.getElementById("eyef").getAttribute("cx");
            let cy = document.getElementById("eyef").getAttribute("cy");

            let x = evt.clientX / innerWidth;
            let y = evt.clientY / innerHeight;

            this.mouse_x = x
            this.mouse_y = y

            cx = 115 + 30 * x;
            cy = 50 + 30 * y;

            eyef.setAttribute("cx", cx);
            eyef.setAttribute("cy", cy);
        }
    }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Bungee");

.error-wrap {
    height: 100%;
    font-family: "Bungee", cursive;
    text-align: center;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    svg {
        width: 50vw;
    }

    .lightblue {
        fill: #444;
    }

    #eye-wrap {
        overflow: hidden;
    }

    .error-text {
        font-size: 120px;
    }

    .alarm {
        animation: alarmOn 0.5s infinite;
    }

    @keyframes alarmOn {
        to {
            fill: darkred;
        }
    }
}
</style>
