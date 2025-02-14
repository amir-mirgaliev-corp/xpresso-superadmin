<template>
    <GoogleMap
        api-key=""
        :center="center"
        :zoom="15"
    >
        
    </GoogleMap>
</template>

<script>

import { GoogleMap, Marker, AdvancedMarker } from 'vue3-google-map';

export default {
    data: () => ({
        center: { 
            lat: 40.689247, 
            lng: -74.044502 
        }
    }),

    components: {
        GoogleMap,
        AdvancedMarker,
        Marker
    }
}

</script>