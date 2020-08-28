import { computed } from 'vue';
import { createNamespace, addUnit } from '../utils';

const [createComponent, bem] = createNamespace('loading');

export default createComponent({
  props: {
    size: [Number, String],
    color: String,
    vertical: Boolean,
    textSize: [Number, String],
    type: {
      type: String,
      default: 'circular',
    },
  },

  setup(props, { slots }) {
    const SpinIcon = [];
    for (let i = 0; i < 12; i++) {
      SpinIcon.push(<i />);
    }

    const CircularIcon = (
      <svg class={bem('circular')} viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    );

    const renderText = () => {
      if (slots.default) {
        return (
          <span
            class={bem('text')}
            style={{
              fontSize: addUnit(props.textSize),
            }}
          >
            {slots.default()}
          </span>
        );
      }
    };

    const spinnerStyle = computed(() => {
      const style = {
        color: props.color,
      };

      if (props.size) {
        const size = addUnit(props.size);
        style.width = size;
        style.height = size;
      }

      return style;
    });

    return () => {
      const { type, vertical } = props;

      return (
        <div class={bem([type, { vertical }])}>
          <span class={bem('spinner', type)} style={spinnerStyle.value}>
            {type === 'spinner' ? SpinIcon : CircularIcon}
          </span>
          {renderText()}
        </div>
      );
    };
  },
});