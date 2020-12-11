import { Point } from 'pixi.js'
import autoComplete from '@tarekraafat/autocomplete.js'

export default () => {

    // Listner
    // document.querySelector("#autoComplete").addEventListener("autoComplete", event => {
    //     console.log(event)
    // })

    const placeholder = 'Search'

    // The autoComplete.js Engine instance creator

    const autoCompletejs = new autoComplete({

        // Data declaration

        data: {
            src: async () => {
                return s.nodes.reduce((array, { name, x, y }) => {

                    array.push({
                        name: name,
                        x: x,
                        y: y
                    })

                    return array
                }, [])
            },
            key: ["name"],
            // key: ["food", "cities", "animals"],
            cache: false
        },

        // Sort

        sort: (a, b) => {
            if (a.match < b.match) return -1
            if (a.match > b.match) return 1
            return 0
        },
        placeHolder: placeholder,
        selector: "#autoComplete",
        threshold: 0,
        debounce: 0,
        // searchEngine: "strict",
        searchEngine: "loose",
        highlight: true,
        maxResults: 10,
        resultsList: {
            render: true,
            container: source => {
                source.setAttribute("id", "autoComplete_list")
            },
            destination: document.querySelector("#autoComplete"),
            position: "afterend",
            element: "ul"
        },
        resultItem: {
            content: (data, source) => {
                source.innerHTML = data.match
            },
            element: "li"
        },
        noResults: () => {
            const result = document.createElement("li")
            result.setAttribute("class", "no_result")
            result.setAttribute("tabindex", "1")
            result.innerHTML = "No Results"
            document.querySelector("#autoComplete_list").appendChild(result)
        },
        onSelection: feedback => {

            console.log(feedback)

            const key = feedback.selection.key
            const node = feedback.selection.value
            const { x, y, name } = node
            const center = { x: s.viewport.center.x, y: s.viewport.center.y }

            document.querySelector("#autoComplete").value = name

            // Zooming from distant to close

            const zoomIn = () => s.viewport.animate({
                scale: s.zoomMax,
                position: new Point(x, y),
                time: 2000,
                ease: 'easeInOutSine',
            })

            // Zooming from close to close

            const zoomOutIn = () => s.viewport.animate({
                scale: s.zoomMin,
                position: new Point((x + center.x) / 2, (y + center.y) / 2),
                time: 2000,
                ease: 'easeInOutSine',
                callbackOnComplete: () => {
                    s.viewport.animate({
                        scale: s.zoomMax,
                        position: new Point(x, y),
                        time: 2000,
                        ease: 'easeInOutSine',
                    })
                }
            })

            if (s.viewport.scale.x < 1)
                zoomIn()
            else
                zoomOutIn()


        }
    })

}